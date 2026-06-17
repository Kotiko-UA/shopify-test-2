(() => {
	let swiperLoader

	const loadSwiper = (scriptUrl, stylesheetUrl) => {
		if (stylesheetUrl && !document.querySelector('link[data-product-slider-swiper-styles]')) {
			document.head.insertAdjacentHTML(
				'beforeend',
				`<link rel="stylesheet" href="${stylesheetUrl}" data-product-slider-swiper-styles>`,
			)
		}

		if (window.Swiper) return Promise.resolve(window.Swiper)
		if (swiperLoader) return swiperLoader

		swiperLoader = new Promise((resolve, reject) => {
			const existingScript = document.querySelector('script[data-product-slider-swiper-script]')

			if (existingScript) {
				existingScript.addEventListener('load', () => resolve(window.Swiper), { once: true })
				existingScript.addEventListener('error', reject, { once: true })
				return
			}

			// Script elements inserted with insertAdjacentHTML do not execute in browsers.
			const script = document.createElement('script')
			script.src = scriptUrl
			script.async = true
			script.dataset.productSliderSwiperScript = ''
			script.addEventListener('load', () => resolve(window.Swiper), { once: true })
			script.addEventListener('error', reject, { once: true })
			document.head.append(script)
		}).catch((error) => {
			swiperLoader = undefined
			throw error
		})

		return swiperLoader
	}

	const numberFromDataset = (value, fallback) => {
		const parsedValue = Number(value)
		return Number.isFinite(parsedValue) ? parsedValue : fallback
	}

	const initProductSlider = async (slider) => {
		if (slider.productSliderSwiper || slider.dataset.productSliderLoading === 'true') return

		const swiperElement = slider.querySelector('.product-slider__swiper')
		const slideCount = slider.querySelectorAll('.swiper-slide').length

		if (!swiperElement || slideCount === 0) return

		slider.dataset.productSliderLoading = 'true'

		try {
			const Swiper = await loadSwiper(slider.dataset.swiperScript, slider.dataset.swiperStylesheet)
			if (!slider.isConnected || !Swiper) return

			const slidesMobile = numberFromDataset(slider.dataset.slidesMobile, 1)
			const slidesTablet = numberFromDataset(slider.dataset.slidesTablet, 2)
			const slidesDesktop = numberFromDataset(slider.dataset.slidesDesktop, 4)
			const spaceBetween = numberFromDataset(slider.dataset.spaceBetween, 16)
			const previousButton = slider.querySelector('.product-slider__button--previous')
			const nextButton = slider.querySelector('.product-slider__button--next')
			const pagination = slider.querySelector('.product-slider__pagination')
			const largestSlidesPerView = Math.max(slidesMobile, slidesTablet, slidesDesktop)

			const options = {
				slidesPerView: slidesMobile,
				spaceBetween,
				watchOverflow: true,
				grabCursor: true,
				loop: slider.dataset.enableLoop === 'true' && slideCount > largestSlidesPerView,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				a11y: {
					enabled: true,
					prevSlideMessage: slider.dataset.previousLabel,
					nextSlideMessage: slider.dataset.nextLabel,
				},
				breakpoints: {
					750: { slidesPerView: slidesTablet },
					990: { slidesPerView: slidesDesktop },
				},
			}

			if (previousButton && nextButton) {
				options.navigation = {
					prevEl: previousButton,
					nextEl: nextButton,
				}
			}

			if (pagination) {
				options.pagination = {
					el: pagination,
					clickable: true,
					dynamicBullets: slideCount > 8,
				}
			}

			slider.productSliderSwiper = new Swiper(swiperElement, options)
		} catch (error) {
			console.error('Product slider could not be initialized.', error)
		} finally {
			delete slider.dataset.productSliderLoading
		}
	}

	const initProductSliders = (container = document) => {
		const sliders = container.matches?.('[data-product-slider]')
			? [container]
			: container.querySelectorAll('[data-product-slider]')

		sliders.forEach(initProductSlider)
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => initProductSliders(), { once: true })
	} else {
		initProductSliders()
	}

	document.addEventListener('shopify:section:load', (event) => initProductSliders(event.target))
	document.addEventListener('shopify:section:unload', (event) => {
		event.target.querySelectorAll('[data-product-slider]').forEach((slider) => {
			slider.productSliderSwiper?.destroy(true, true)
		})
	})
})()
