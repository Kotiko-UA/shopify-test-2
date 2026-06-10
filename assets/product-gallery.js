;(function () {
	const gallerySelector = '[data-product-gallery]'
	const featuredImageSelector = '[data-product-gallery-featured] img'
	const thumbnailSelector = '[data-product-gallery-thumbnail]'

	function setActiveThumbnail(gallery, activeThumbnail) {
		gallery.querySelectorAll(thumbnailSelector).forEach(thumbnail => {
			const isActive = thumbnail === activeThumbnail

			thumbnail.classList.toggle('product-thumbnail--active', isActive)
			thumbnail.setAttribute('aria-current', String(isActive))
		})
	}

	function updateFeaturedImage(featuredImage, thumbnail) {
		featuredImage.src = thumbnail.dataset.gallerySrc
		featuredImage.srcset = thumbnail.dataset.gallerySrcset
		featuredImage.sizes = thumbnail.dataset.gallerySizes
		featuredImage.alt = thumbnail.dataset.galleryAlt || ''

		if (thumbnail.dataset.galleryWidth && thumbnail.dataset.galleryHeight) {
			featuredImage.width = Number(thumbnail.dataset.galleryWidth)
			featuredImage.height = Number(thumbnail.dataset.galleryHeight)
		}
	}

	document.addEventListener('click', event => {
		if (!(event.target instanceof Element)) return

		const thumbnail = event.target.closest(thumbnailSelector)

		if (!thumbnail) return

		const gallery = thumbnail.closest(gallerySelector)
		const featuredImage = gallery?.querySelector(featuredImageSelector)

		if (!gallery || !featuredImage || !thumbnail.dataset.gallerySrc) return

		updateFeaturedImage(featuredImage, thumbnail)
		setActiveThumbnail(gallery, thumbnail)
	})
})()
