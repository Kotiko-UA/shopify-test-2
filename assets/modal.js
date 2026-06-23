;(function () {
	if (window.__themeModalInitialized) return

	window.__themeModalInitialized = true

	const modalSelector = '[data-modal]'
	const openSelector = '[data-modal-open]'
	const closeSelector = '[data-modal-close]'

	function getDialog(id) {
		if (!id) return null

		const dialog = document.getElementById(id)
		return dialog instanceof HTMLDialogElement ? dialog : null
	}

	function openDialog(dialog) {
		if (!dialog || dialog.open) return

		dialog.showModal()
	}

	function closeDialog(dialog) {
		if (!dialog || !dialog.open) return

		dialog.close()
	}

	function isBackdropClick(dialog, event) {
		const rect = dialog.getBoundingClientRect()

		return (
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom
		)
	}

	document.addEventListener('click', event => {
		if (!(event.target instanceof Element)) return

		const opener = event.target.closest(openSelector)
		if (opener) {
			event.preventDefault()
			openDialog(getDialog(opener.getAttribute('data-modal-open')))
			return
		}

		const closeButton = event.target.closest(closeSelector)
		if (closeButton) {
			event.preventDefault()
			closeDialog(closeButton.closest(modalSelector))
			return
		}

		const dialog = event.target.closest(modalSelector)
		if (dialog && event.target === dialog && isBackdropClick(dialog, event)) {
			closeDialog(dialog)
		}
	})
})()
