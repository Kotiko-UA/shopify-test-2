const productForms = document.querySelectorAll('.js-product-form')

productForms.forEach(form => {
	form.addEventListener('submit', event => {
		event.preventDefault()

		const formData = new FormData(form)

		console.log('Product form submitted')
		console.log('Variant ID:', formData.get('id'))
		console.log('Quantity:', formData.get('quantity'))
		console.log('Gift message:', formData.get('properties[Gift message]'))
		console.log('Source:', formData.get('properties[_source]'))
	})
})
