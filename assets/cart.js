;(function () {
	const cartToast = document.querySelector('.cart-toast')
	const cartToastText = document.querySelector('.cart-toast__text')
	let cartToastTimeout
	let lastCartDrawerTrigger = null

	const focusableSelector = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])',
	].join(',')

	function getCartDrawer() {
		return document.querySelector('[data-cart-drawer]')
	}

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

	function replaceSectionsFromResponse(sections = {}) {
		Object.entries(sections).forEach(([sectionId, sectionHtml]) => {
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
		})
	}

	function getSectionIdFromElement(element) {
		const section = element?.closest('.shopify-section')

		if (!section?.id?.startsWith('shopify-section-')) return null

		return section.id.replace('shopify-section-', '')
	}

	function getCartSectionIds() {
		return [
			getSectionIdFromElement(
				document.querySelector('[data-cart-drawer-trigger]'),
			),
			getSectionIdFromElement(getCartDrawer()),
			getSectionIdFromElement(document.querySelector('[data-cart-page]')),
		].filter(Boolean)
	}

	async function refreshRenderedSections() {
		const sectionIds = getCartSectionIds()

		const uniqueSectionIds = [...new Set(sectionIds)]

		await Promise.all(
			uniqueSectionIds.map(sectionId => replaceSection(sectionId)),
		)
	}

	function updateCartCount(cart) {
		const cartCount = document.querySelector('.header__cart-count')
		const cartLink = document.querySelector('[data-cart-drawer-trigger]')

		if (cartCount) {
			cartCount.textContent = cart.item_count
			cartCount.hidden = cart.item_count === 0
		}

		if (cartLink?.dataset.cartLabelTemplate) {
			cartLink.setAttribute(
				'aria-label',
				cartLink.dataset.cartLabelTemplate.replace('COUNT', cart.item_count),
			)
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
				sections: getCartSectionIds(),
			}),
		})

		const cart = await response.json()

		if (!response.ok) {
			throw new Error(cart.description || 'Could not update cart')
		}

		updateCartCount(cart)
		return cart
	}

	async function updateCart(payload) {
		const response = await fetch(getShopifyRoute('cart/update.js'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...payload,
				sections: getCartSectionIds(),
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

	function getFocusableElements(container) {
		return [...container.querySelectorAll(focusableSelector)].filter(
			element =>
				element.offsetParent !== null ||
				element === document.activeElement,
		)
	}

	function getCartDrawerTrigger() {
		return document.querySelector('[data-cart-drawer-trigger]')
	}

	function setCartDrawerExpanded(isExpanded) {
		getCartDrawerTrigger()?.setAttribute('aria-expanded', String(isExpanded))
	}

	function isCartDrawerOpen() {
		const cartDrawer = getCartDrawer()

		return Boolean(cartDrawer && !cartDrawer.hidden)
	}

	function openCartDrawer() {
		const cartDrawer = getCartDrawer()

		if (!cartDrawer) return

		lastCartDrawerTrigger = getCartDrawerTrigger()
		cartDrawer.hidden = false
		cartDrawer.setAttribute('aria-hidden', 'false')
		setCartDrawerExpanded(true)
		document.documentElement.classList.add('cart-drawer-open')

		const focusableElements = getFocusableElements(cartDrawer)
		focusableElements[0]?.focus()
	}

	function closeCartDrawer() {
		const cartDrawer = getCartDrawer()

		if (!cartDrawer || cartDrawer.hidden) return

		cartDrawer.hidden = true
		cartDrawer.setAttribute('aria-hidden', 'true')
		setCartDrawerExpanded(false)
		document.documentElement.classList.remove('cart-drawer-open')

		if (lastCartDrawerTrigger?.isConnected) {
			lastCartDrawerTrigger.focus()
		} else {
			getCartDrawerTrigger()?.focus()
		}
	}

	function keepFocusInCartDrawer(event) {
		const cartDrawer = getCartDrawer()

		if (!cartDrawer || cartDrawer.hidden || event.key !== 'Tab') return

		const focusableElements = getFocusableElements(cartDrawer)

		if (focusableElements.length === 0) {
			event.preventDefault()
			return
		}

		const firstFocusableElement = focusableElements[0]
		const lastFocusableElement =
			focusableElements[focusableElements.length - 1]

		if (event.shiftKey && document.activeElement === firstFocusableElement) {
			event.preventDefault()
			lastFocusableElement.focus()
			return
		}

		if (!event.shiftKey && document.activeElement === lastFocusableElement) {
			event.preventDefault()
			firstFocusableElement.focus()
		}
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
		const currentCartDrawer = getCartDrawer()
		const shouldOpenDrawer =
			event.detail.action === 'add' ||
			(currentCartDrawer && !currentCartDrawer.hidden)

		const sectionsPromise = event.detail.cart.sections
			? Promise.resolve(replaceSectionsFromResponse(event.detail.cart.sections))
			: refreshRenderedSections()

		sectionsPromise
			.catch(error => {
				console.error('Section refresh failed:', error)
			})
			.then(() => {
				if (shouldOpenDrawer) {
					openCartDrawer()
				}
			})
	})

	document.addEventListener('click', async event => {
		if (!(event.target instanceof Element)) return

		const closeButton = event.target.closest('[data-cart-drawer-close]')

		if (closeButton) {
			closeCartDrawer()
			return
		}

		const discountApplyButton = event.target.closest(
			'[data-cart-discount-apply]',
		)

		if (discountApplyButton) {
			const discountField = document.querySelector('[data-cart-discount-code]')
			const discountCode = discountField?.value.trim()

			if (!discountCode) return

			window.location.href = `${window.Shopify.routes.root}discount/${encodeURIComponent(
				discountCode,
			)}?redirect=/checkout`

			return
		}

		const trigger = event.target.closest('[data-cart-drawer-trigger]')

		if (!trigger) return

		event.preventDefault()
		lastCartDrawerTrigger = trigger

		await refreshCart()
		await refreshRenderedSections()
		openCartDrawer()
	})

	document.addEventListener('click', async event => {
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

		event.preventDefault()

		removeButton.setAttribute('aria-disabled', 'true')

		if ('disabled' in removeButton) {
			removeButton.disabled = true
		}

		try {
			const cart = await changeCartItem(removeButton.dataset.lineKey, 0)

			dispatchCartUpdated(cart, {
				action: 'remove',
			})
		} catch (error) {
			console.error('Remove cart item failed:', error)
			removeButton.removeAttribute('aria-disabled')

			if ('disabled' in removeButton) {
				removeButton.disabled = false
			}
		}
	})

	document.addEventListener('change', async event => {
		if (!(event.target instanceof Element)) return

		const quantityField = event.target.closest('[data-cart-line-quantity]')

		if (quantityField) {
			quantityField.disabled = true

			try {
				const cart = await changeCartItem(
					quantityField.dataset.lineKey,
					Number(quantityField.value),
				)

				dispatchCartUpdated(cart, {
					action: 'quantity',
				})
			} catch (error) {
				console.error('Update cart line quantity failed:', error)
				quantityField.disabled = false
			}

			return
		}

		const noteField = event.target.closest('[data-cart-note]')

		if (noteField) {
			try {
				const cart = await updateCart({
					note: noteField.value,
				})

				dispatchCartUpdated(cart, {
					action: 'note',
				})
			} catch (error) {
				console.error('Update cart note failed:', error)
			}

			return
		}

		const attributeField = event.target.closest('[data-cart-attribute]')

		if (!attributeField) return

		const attributeName = attributeField.name.match(/^attributes\[(.+)\]$/)?.[1]

		if (!attributeName) return

		try {
			const cart = await updateCart({
				attributes: {
					[attributeName]: attributeField.value,
				},
			})

			dispatchCartUpdated(cart, {
				action: 'attribute',
			})
		} catch (error) {
			console.error('Update cart attribute failed:', error)
		}
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && isCartDrawerOpen()) {
			closeCartDrawer()
			return
		}

		keepFocusInCartDrawer(event)
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
		openCartDrawer,
		closeCartDrawer,
		replaceSection,
		refreshRenderedSections,
		replaceSectionsFromResponse,
		getCartSectionIds,
		updateCart,
	}
})()
