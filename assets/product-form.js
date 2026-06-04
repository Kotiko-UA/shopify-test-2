(function () {
const productForms = document.querySelectorAll('.js-product-form')

if (!window.themeCart) {
	throw new Error('themeCart is required before product-form.js')
}

const {
	getShopifyRoute,
	refreshCart,
	dispatchCartUpdated,
} = window.themeCart

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
})()
