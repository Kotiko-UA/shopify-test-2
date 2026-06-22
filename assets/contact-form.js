;(function () {
	if (window.themeContactFormInitialized) return
	window.themeContactFormInitialized = true

	function redirectSuccessfulForms(container = document) {
		if (window.Shopify?.designMode) return

		container.querySelectorAll('[data-contact-success]').forEach(success => {
			const url = success.dataset.redirectUrl
			if (!url) return

			const delay = Number(success.dataset.redirectDelay || 0)
			window.setTimeout(() => window.location.assign(url), delay)
		})
	}

	redirectSuccessfulForms()
	document.addEventListener('shopify:section:load', event => redirectSuccessfulForms(event.target))
})()
