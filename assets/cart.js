;(function () {
	const cartDrawer = document.querySelector('[data-cart-drawer]')
	const cartToast = document.querySelector('.cart-toast')
	const cartToastText = document.querySelector('.cart-toast__text')
	let cartToastTimeout

	function getShopifyRoute(path) {
		return `${window.Shopify.routes.root}${path}`
	}

	async function fetchCart() {
		const response = await fetch(getShopifyRoute('cart.js'))

		if (!response.ok) {
			throw new Error('Could not fetch cart')
		}

		return response.json()
	}

	async function fetchSectionHtml(sectionId) {
		const response = await fetch(
			`${window.Shopify.routes.root}?sections=${encodeURIComponent(sectionId)}`,
		)

		if (!response.ok) {
			throw new Error('Could not fetch section HTML')
		}

		const sections = await response.json()

		return sections[sectionId]
	}

	async function replaceSection(sectionId) {
		const sectionHtml = await fetchSectionHtml(sectionId)

		if (!sectionHtml) return

		const parser = new DOMParser()
		const newDocument = parser.parseFromString(sectionHtml, 'text/html')

		const currentSection = document.getElementById(
			`shopify-section-${sectionId}`,
		)
		const newSection = newDocument.getElementById(
			`shopify-section-${sectionId}`,
		)

		if (!currentSection || !newSection) return

		currentSection.replaceWith(newSection)
	}

	function getSectionIdFromElement(element) {
		const section = element?.closest('.shopify-section')

		if (!section?.id?.startsWith('shopify-section-')) return null

		return section.id.replace('shopify-section-', '')
	}

	async function refreshRenderedSections() {
		const sectionIds = [
			getSectionIdFromElement(document.querySelector('[data-cart-drawer-trigger]')),
			getSectionIdFromElement(document.querySelector('[data-cart-page]')),
		].filter(Boolean)

		const uniqueSectionIds = [...new Set(sectionIds)]

		await Promise.all(uniqueSectionIds.map(sectionId => replaceSection(sectionId)))
	}

	function updateCartCount(cart) {
		const cartCount = document.querySelector('.header__cart-count')

		if (cartCount) {
			cartCount.textContent = cart.item_count
			cartCount.hidden = cart.item_count === 0
		}
	}

	async function refreshCart() {
		const cart = await fetchCart()

		updateCartCount(cart)
		return cart
	}

	async function changeCartItem(lineKey, quantity) {
		const response = await fetch(getShopifyRoute('cart/change.js'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: lineKey,
				quantity,
			}),
		})

		const cart = await response.json()

		if (!response.ok) {
			throw new Error(cart.description || 'Could not update cart')
		}

		updateCartCount(cart)
		return cart
	}

	function dispatchCartUpdated(cart, detail = {}) {
		document.dispatchEvent(
			new CustomEvent('cart:updated', {
				detail: {
					cart,
					...detail,
				},
			}),
		)
	}

	function formatMoney(cents, currency) {
		return new Intl.NumberFormat(document.documentElement.lang || 'en', {
			style: 'currency',
			currency: currency || 'USD',
		}).format(cents / 100)
	}

	function escapeHtml(value = '') {
		const escapeMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
		}

		return String(value ?? '').replace(
			/[&<>"']/g,
			character => escapeMap[character],
		)
	}

	function renderCartDrawerItem(item, currency, labels) {
		const imageHtml = item.image
			? `
			<img
				class="cart-drawer__item-image"
				src="${escapeHtml(item.image)}"
				alt="${escapeHtml(item.title || item.product_title)}"
			>
		`
			: '<div class="cart-drawer__item-image"></div>'

		const variantHtml =
			item.variant_title && item.variant_title !== 'Default Title'
				? `<p class="cart-drawer__item-meta">${escapeHtml(item.variant_title)}</p>`
				: ''

		const itemProperties = Object.entries(item.properties || {}).filter(
			([propertyName, propertyValue]) =>
				propertyValue !== '' && !propertyName.startsWith('_'),
		)

		const propertiesHtml = itemProperties
			.map(
				([propertyName, propertyValue]) => `
			<p class="cart-drawer__item-meta">
				${escapeHtml(propertyName)}: ${escapeHtml(propertyValue)}
			</p>
		`,
			)
			.join('')

		return `
		<div class="cart-drawer__item">
			${imageHtml}

			<div class="cart-drawer__item-content">
				<p class="cart-drawer__item-title">${escapeHtml(item.product_title)}</p>
				${variantHtml}
				${propertiesHtml}

				<div class="cart-drawer__quantity" aria-label="${escapeHtml(labels.quantity)}">
					<button
						class="cart-drawer__quantity-button"
						type="button"
						data-cart-quantity-button
						data-line-key="${escapeHtml(item.key)}"
						data-quantity="${item.quantity - 1}"
					>
						-
					</button>

					<span class="cart-drawer__quantity-value">${item.quantity}</span>

					<button
						class="cart-drawer__quantity-button"
						type="button"
						data-cart-quantity-button
						data-line-key="${escapeHtml(item.key)}"
						data-quantity="${item.quantity + 1}"
					>
						+
					</button>
				</div>

				<p class="cart-drawer__item-price">${escapeHtml(formatMoney(item.final_line_price, currency))}</p>

				<button
					class="cart-drawer__remove"
					type="button"
					data-cart-remove-button
					data-line-key="${escapeHtml(item.key)}"
				>
					${escapeHtml(labels.remove)}
				</button>
			</div>
		</div>
	`
	}

	function renderCartDrawer(cart) {
		const itemsContainer = document.querySelector('[data-cart-drawer-items]')
		const total = document.querySelector('[data-cart-drawer-total]')

		if (!cartDrawer || !itemsContainer || !total) return

		const labels = {
			quantity: cartDrawer.dataset.quantityText || 'Qty',
			remove: cartDrawer.dataset.removeText || 'Remove',
		}

		total.textContent = formatMoney(cart.total_price, cart.currency)

		if (cart.items.length === 0) {
			itemsContainer.replaceChildren()
			itemsContainer.insertAdjacentHTML(
				'beforeend',
				`<p class="cart-drawer__empty">${escapeHtml(cartDrawer.dataset.emptyText)}</p>`,
			)
			return
		}

		const itemsHtml = cart.items
			.map(item => renderCartDrawerItem(item, cart.currency, labels))
			.join('')

		itemsContainer.replaceChildren()
		itemsContainer.insertAdjacentHTML('beforeend', itemsHtml)
	}

	function openCartDrawer() {
		if (!cartDrawer) return

		cartDrawer.hidden = false
		cartDrawer.setAttribute('aria-hidden', 'false')
		document.documentElement.classList.add('cart-drawer-open')
	}

	function closeCartDrawer() {
		if (!cartDrawer) return

		cartDrawer.hidden = true
		cartDrawer.setAttribute('aria-hidden', 'true')
		document.documentElement.classList.remove('cart-drawer-open')
	}

	document.addEventListener('cart:updated', event => {
		if (!cartToast || !cartToastText || event.detail.action !== 'add') return

		window.clearTimeout(cartToastTimeout)
		cartToastText.textContent = cartToast.dataset.addedText
		cartToast.hidden = false

		cartToastTimeout = window.setTimeout(() => {
			cartToast.hidden = true
		}, 2400)
	})

	document.addEventListener('cart:updated', event => {
		renderCartDrawer(event.detail.cart)
		refreshRenderedSections().catch(error => {
			console.error('Section refresh failed:', error)
		})

		if (event.detail.action === 'add') {
			openCartDrawer()
		}
	})

	document.querySelectorAll('[data-cart-drawer-close]').forEach(closeButton => {
		closeButton.addEventListener('click', closeCartDrawer)
	})

	document.addEventListener('click', async event => {
		if (!(event.target instanceof Element)) return

		const trigger = event.target.closest('[data-cart-drawer-trigger]')

		if (!trigger) return

		event.preventDefault()

		const cart = await refreshCart()

		renderCartDrawer(cart)
		openCartDrawer()
	})

	if (cartDrawer) {
		cartDrawer.addEventListener('click', async event => {
			if (!(event.target instanceof Element)) return

			const quantityButton = event.target.closest('[data-cart-quantity-button]')

			if (quantityButton) {
				quantityButton.disabled = true

				try {
					const cart = await changeCartItem(
						quantityButton.dataset.lineKey,
						Number(quantityButton.dataset.quantity),
					)

					dispatchCartUpdated(cart, {
						action: 'quantity',
					})
				} catch (error) {
					console.error('Update cart quantity failed:', error)
					quantityButton.disabled = false
				}

				return
			}

			const removeButton = event.target.closest('[data-cart-remove-button]')

			if (!removeButton) return

			removeButton.disabled = true

			try {
				const cart = await changeCartItem(removeButton.dataset.lineKey, 0)

				dispatchCartUpdated(cart, {
					action: 'remove',
				})
			} catch (error) {
				console.error('Remove cart item failed:', error)
				removeButton.disabled = false
			}
		})
	}

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') {
			closeCartDrawer()
		}
	})

	window.themeCart = {
		getShopifyRoute,
		fetchCart,
		fetchSectionHtml,
		updateCartCount,
		refreshCart,
		changeCartItem,
		dispatchCartUpdated,
		formatMoney,
		escapeHtml,
		renderCartDrawer,
		openCartDrawer,
		closeCartDrawer,
		replaceSection,
		refreshRenderedSections,
	}
})()
