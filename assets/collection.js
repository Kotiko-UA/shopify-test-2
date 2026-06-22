;(function () {
	const containerSelector = '[data-collection-content]'

	function closeFilters(container) {
		container.querySelector('[data-collection-filters]')?.classList.remove('is-open')
		container.querySelector('.collection-filters__overlay')?.classList.remove('is-open')
		document.body.classList.remove('collection-filters-open')
	}

	function openFilters(container) {
		container.querySelector('[data-collection-filters]')?.classList.add('is-open')
		container.querySelector('.collection-filters__overlay')?.classList.add('is-open')
		document.body.classList.add('collection-filters-open')
	}

	async function loadCollection(container, url, pushState = true) {
		const fetchUrl = new URL(url, window.location.origin)
		const browserUrl = new URL(fetchUrl)
		fetchUrl.searchParams.set('section_id', container.dataset.sectionId)

		container.setAttribute('aria-busy', 'true')

		try {
			const response = await fetch(fetchUrl)
			if (!response.ok) throw new Error('Could not load collection')

			const html = await response.text()
			const documentFragment = new DOMParser().parseFromString(html, 'text/html')
			const nextContainer = documentFragment.querySelector(containerSelector)
			if (!nextContainer) throw new Error('Collection response is missing content')

			document.body.classList.remove('collection-filters-open')
			container.replaceWith(nextContainer)
			if (pushState) window.history.pushState({}, '', browserUrl)
			initCollection(nextContainer)
		} catch (error) {
			console.error(error)
			window.location.assign(browserUrl)
		}
	}

	function initCollection(container) {
		if (!container || container.dataset.collectionInitialized === 'true') return
		container.dataset.collectionInitialized = 'true'

		container.addEventListener('click', event => {
			if (event.target.closest('[data-collection-filter-toggle]')) {
				openFilters(container)
				return
			}
			if (event.target.closest('[data-collection-filter-close]')) {
				closeFilters(container)
				return
			}

			const link = event.target.closest('.collection-active-filters a, .collection-pagination a, .collection-filters__clear')
			if (!link) return
			event.preventDefault()
			loadCollection(container, link.href)
		})

		container.addEventListener('submit', event => {
			const form = event.target.closest('.collection-sort-form, .collection-filters')
			if (!form) return
			event.preventDefault()
			const url = new URL(window.location.pathname, window.location.origin)
			url.search = new URLSearchParams(new FormData(form)).toString()
			loadCollection(container, url)
		})
	}

	document.querySelectorAll(containerSelector).forEach(initCollection)
	document.addEventListener('keydown', event => {
		if (event.key !== 'Escape') return
		document.querySelectorAll(containerSelector).forEach(closeFilters)
	})
	window.addEventListener('popstate', () => {
		const container = document.querySelector(containerSelector)
		if (container) loadCollection(container, window.location.href, false)
	})
})()
