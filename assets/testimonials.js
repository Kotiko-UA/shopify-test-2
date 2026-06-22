;(function () {
	if (window.themeTestimonialsInitialized) return
	window.themeTestimonialsInitialized = true

	function initTestimonials(section) {
		if (section.dataset.testimonialsInitialized === 'true') return
		section.dataset.testimonialsInitialized = 'true'
		const track = section.querySelector('[data-testimonials-track]')
		if (!track) return

		const scroll = direction => {
			const card = track.querySelector('.testimonial')
			const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || 0)
			track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: 'smooth' })
		}

		section.querySelector('[data-testimonials-previous]')?.addEventListener('click', () => scroll(-1))
		section.querySelector('[data-testimonials-next]')?.addEventListener('click', () => scroll(1))
	}

	document.querySelectorAll('[data-testimonials]').forEach(initTestimonials)
	document.addEventListener('shopify:section:load', event => event.target.querySelectorAll('[data-testimonials]').forEach(initTestimonials))
})()
