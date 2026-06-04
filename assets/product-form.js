const productForms = document.querySelectorAll('.js-product-form')
const cartDrawer = document.querySelector('[data-cart-drawer]')
const cartToast = document.querySelector('.cart-toast')
const cartToastText = document.querySelector('.cart-toast__text')
let cartToastTimeout

function getShopifyRoute(path) {
	return `${window.Shopify.routes.root}${path}`
}

function setFormMessage(message, text = '') {
	if (!message) return

	message.textContent = text
	message.hidden = text === ''
}

function setSubmitButtonState(button, { disabled, text }) {
	if (!button) return

	button.disabled = disabled
	button.value = text
}

async function fetchCart() {
	const response = await fetch(getShopifyRoute('cart.js'))

	if (!response.ok) {
		throw new Error('Could not fetch cart')
	}

	return response.json()
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

	return String(value ?? '').replace(/[&<>"']/g, character => escapeMap[character])
}

function createCartDrawerItemHtml(item, currency, labels) {
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

	return `
		<div class="cart-drawer__item">
			${imageHtml}

			<div class="cart-drawer__item-content">
				<p class="cart-drawer__item-title">${escapeHtml(item.product_title)}</p>
				${variantHtml}

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
		.map(item => createCartDrawerItemHtml(item, cart.currency, labels))
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

productForms.forEach(form => {
	form.addEventListener('submit', async event => {
		event.preventDefault()

		const formData = new FormData(form)

		const submitButton = form.querySelector('[type="submit"]')
		const message = form.querySelector('.product-form__message')
		const originalButtonText = submitButton.value
		const addingText = form.dataset.addingText
		const addedText = form.dataset.addedText
		const errorText = form.dataset.errorText

		setSubmitButtonState(submitButton, {
			disabled: true,
			text: addingText,
		})

		setFormMessage(message)

		try {
			const response = await fetch(getShopifyRoute('cart/add.js'), {
				method: 'POST',
				body: formData,
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.description || 'Could not add item to cart')
			}

			const cart = await refreshCart()

			dispatchCartUpdated(cart, {
				action: 'add',
				item: result,
			})

			setSubmitButtonState(submitButton, {
				disabled: true,
				text: addedText,
			})

			setFormMessage(message, addedText)

			setTimeout(() => {
				setSubmitButtonState(submitButton, {
					disabled: false,
					text: originalButtonText,
				})
			}, 1200)
		} catch (error) {
			console.error('Add to cart failed:', error)

			setSubmitButtonState(submitButton, {
				disabled: false,
				text: originalButtonText,
			})

			setFormMessage(message, error.message || errorText)
		}
	})
})

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

	if (event.detail.action === 'add') {
		openCartDrawer()
	}
})

document.querySelectorAll('[data-cart-drawer-close]').forEach(closeButton => {
	closeButton.addEventListener('click', closeCartDrawer)
})

document.querySelectorAll('[data-cart-drawer-trigger]').forEach(trigger => {
	trigger.addEventListener('click', async event => {
		event.preventDefault()

		const cart = await refreshCart()

		renderCartDrawer(cart)
		openCartDrawer()
	})
})

if (cartDrawer) {
	cartDrawer.addEventListener('click', async event => {
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
