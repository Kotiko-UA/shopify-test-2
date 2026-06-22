;(function () {
	const gallerySelector = '[data-product-gallery]'
	const mediaSelector = '[data-product-gallery-media]'
	const thumbnailSelector = '[data-product-gallery-thumbnail]'

	function pauseMedia(media) {
		media?.querySelectorAll('video').forEach(video => video.pause())
		media?.querySelectorAll('iframe').forEach(iframe => {
			const src = iframe.src
			iframe.src = src
		})
	}

	function selectMedia(gallery, mediaId) {
		if (!gallery || !mediaId) return

		gallery.querySelectorAll(mediaSelector).forEach(media => {
			const isActive = media.dataset.mediaId === String(mediaId)

			if (!isActive && !media.hidden) pauseMedia(media)
			media.hidden = !isActive
		})

		gallery.querySelectorAll(thumbnailSelector).forEach(thumbnail => {
			const isActive = thumbnail.dataset.mediaId === String(mediaId)
			thumbnail.classList.toggle('product-thumbnail--active', isActive)
			thumbnail.setAttribute('aria-current', String(isActive))
		})
	}

	function openZoom(gallery, trigger) {
		const dialog = gallery.querySelector('[data-product-gallery-dialog]')
		const image = dialog?.querySelector('[data-product-gallery-dialog-image]')

		if (!dialog || !image || !trigger.dataset.zoomSrc) return

		image.src = trigger.dataset.zoomSrc
		image.alt = trigger.dataset.zoomAlt || ''
		dialog.showModal()
	}

	document.addEventListener('click', event => {
		if (!(event.target instanceof Element)) return

		const thumbnail = event.target.closest(thumbnailSelector)
		if (thumbnail) {
			selectMedia(thumbnail.closest(gallerySelector), thumbnail.dataset.mediaId)
			return
		}

		const zoomTrigger = event.target.closest('[data-product-gallery-zoom]')
		if (zoomTrigger) {
			openZoom(zoomTrigger.closest(gallerySelector), zoomTrigger)
			return
		}

		const closeButton = event.target.closest('[data-product-gallery-dialog-close]')
		if (closeButton) {
			closeButton.closest('dialog')?.close()
		}
	})

	document.addEventListener('product:variant-change', event => {
		const mediaId = event.detail?.variant?.featured_media_id
		const gallery = event.target.closest('.product-page')?.querySelector(gallerySelector)

		if (gallery && mediaId) selectMedia(gallery, mediaId)
	})
})()
