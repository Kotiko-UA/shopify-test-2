const productForms = document.querySelectorAll('.js-product-form')

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

async function updateCartCount() {
	const cart = await fetch(`${window.Shopify.routes.root}cart.js`).then(
		response => response.json(),
	)

	const cartCount = document.querySelector('.header__cart-count')

	if (cartCount) {
		cartCount.textContent = cart.item_count
		cartCount.hidden = cart.item_count === 0
	}
	return cart
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
			const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
				method: 'POST',
				body: formData,
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.description || 'Could not add item to cart')
			}

			const cart = await updateCartCount()

			document.dispatchEvent(
				new CustomEvent('cart:updated', {
					detail: {
						cart,
						item: result,
					},
				}),
			)

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

const cartToast = document.querySelector('.cart-toast')
const cartToastText = document.querySelector('.cart-toast__text')

document.addEventListener('cart:updated', event => {
	if (!cartToast || !cartToastText) return

	cartToastText.textContent = `${event.detail.item.title} added to cart`
	cartToast.hidden = false

	setTimeout(() => {
		cartToast.hidden = true
	}, 2400)
})
