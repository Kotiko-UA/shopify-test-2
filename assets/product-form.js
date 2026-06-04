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

function createCartDrawerItem(item, currency, labels) {
	const itemElement = document.createElement('div')
	itemElement.className = 'cart-drawer__item'

	if (item.image) {
		const image = document.createElement('img')
		image.className = 'cart-drawer__item-image'
		image.src = item.image
		image.alt = item.title
		itemElement.append(image)
	} else {
		const imagePlaceholder = document.createElement('div')
		imagePlaceholder.className = 'cart-drawer__item-image'
		itemElement.append(imagePlaceholder)
	}

	const content = document.createElement('div')
	content.className = 'cart-drawer__item-content'

	const title = document.createElement('p')
	title.className = 'cart-drawer__item-title'
	title.textContent = item.product_title
	content.append(title)

	if (item.variant_title && item.variant_title !== 'Default Title') {
		const variant = document.createElement('p')
		variant.className = 'cart-drawer__item-meta'
		variant.textContent = item.variant_title
		content.append(variant)
	}

	const quantity = document.createElement('p')
	quantity.className = 'cart-drawer__item-meta'
	quantity.textContent = `${labels.quantity}: ${item.quantity}`
	content.append(quantity)

	const price = document.createElement('p')
	price.className = 'cart-drawer__item-price'
	price.textContent = formatMoney(item.final_line_price, currency)
	content.append(price)

	const removeButton = document.createElement('button')
	removeButton.className = 'cart-drawer__remove'
	removeButton.type = 'button'
	removeButton.textContent = labels.remove
	removeButton.dataset.lineKey = item.key
	content.append(removeButton)

	itemElement.append(content)

	return itemElement
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
		const emptyMessage = document.createElement('p')
		emptyMessage.className = 'cart-drawer__empty'
		emptyMessage.textContent = cartDrawer.dataset.emptyText
		itemsContainer.replaceChildren(emptyMessage)
		return
	}

	const itemElements = cart.items.map(item => createCartDrawerItem(item, cart.currency, labels))
	itemsContainer.replaceChildren(...itemElements)
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
		const removeButton = event.target.closest('[data-line-key]')

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
