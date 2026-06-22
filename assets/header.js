;(function () {
	function closeDetails(details) {
		if (details) details.open = false
	}

	function syncBodyState() {
		const hasOpenDrawer = Boolean(
			document.querySelector('[data-header-mobile-menu][open], [data-header-search][open]'),
		)
		document.body.classList.toggle('header-drawer-open', hasOpenDrawer)
	}

	function initHeaders(container = document) {
		container.querySelectorAll('[data-site-header]').forEach(header => {
			if (header.dataset.headerInitialized === 'true') return
			header.dataset.headerInitialized = 'true'

			header.querySelectorAll('details').forEach(details => details.addEventListener('toggle', syncBodyState))
			header.addEventListener('click', event => {
				if (!event.target.closest('[data-header-close]')) return
				header.querySelectorAll('[data-header-mobile-menu][open], [data-header-search][open]').forEach(closeDetails)
				syncBodyState()
			})

			const syncScrolledState = () => header.classList.toggle('site-header--scrolled', window.scrollY > 12)
			window.addEventListener('scroll', syncScrolledState, { passive: true })
			syncScrolledState()
		})
	}

	document.addEventListener('keydown', event => {
		if (event.key !== 'Escape') return
		document.querySelectorAll('[data-header-mobile-menu][open], [data-header-search][open]').forEach(closeDetails)
		syncBodyState()
	})

	initHeaders()
	document.addEventListener('shopify:section:load', event => initHeaders(event.target))
})()
