(() => {
	if (window.themeLogoMarqueeInitialized) return
	window.themeLogoMarqueeInitialized = true

	const init = (container = document) => {
		container.querySelectorAll('[data-logo-marquee]').forEach((marquee) => {
			if (marquee.dataset.logoMarqueeInitialized === 'true') return
			const track = marquee.querySelector('[data-logo-marquee-track]')
			if (!track || track.children.length === 0) return

			marquee.dataset.logoMarqueeInitialized = 'true'
			Array.from(track.children).forEach((item) => {
				const clone = item.cloneNode(true)
				clone.setAttribute('aria-hidden', 'true')
				;[clone, ...clone.querySelectorAll('*')].forEach((element) => {
					element.removeAttribute('id')
					Array.from(element.attributes).forEach((attribute) => {
						if (attribute.name.startsWith('data-shopify')) element.removeAttribute(attribute.name)
					})
					if (element.matches('a, button, input, select, textarea')) element.tabIndex = -1
				})
				track.append(clone)
			})
		})
	}

	init()
	document.addEventListener('shopify:section:load', (event) => init(event.target))
})()
