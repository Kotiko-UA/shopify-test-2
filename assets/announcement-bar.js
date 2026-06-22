;(function () {
	function isScheduled(message, now) {
		const start = message.dataset.start ? new Date(message.dataset.start) : null
		const end = message.dataset.end ? new Date(message.dataset.end) : null
		if (start && !Number.isNaN(start.getTime()) && now < start) return false
		if (end && !Number.isNaN(end.getTime()) && now > end) return false
		return true
	}

	function initAnnouncement(bar) {
		if (bar.dataset.announcementInitialized === 'true') return
		bar.dataset.announcementInitialized = 'true'

		const storageKey = `announcement-dismissed:${bar.dataset.sectionId}`
		if (window.localStorage.getItem(storageKey) === 'true') {
			bar.hidden = true
			return
		}

		const groups = [...bar.querySelectorAll('.announcement-bar__group')]
		const now = new Date()
		groups.forEach(group => {
			group.querySelectorAll('[data-announcement-message]').forEach(message => {
				message.dataset.scheduled = String(isScheduled(message, now))
				if (!isScheduled(message, now)) message.hidden = true
			})
		})

		const messages = [...groups[0].querySelectorAll('[data-announcement-message]')].filter(
			message => message.dataset.scheduled === 'true',
		)
		if (messages.length === 0) {
			bar.hidden = true
			return
		}

		messages[0].hidden = false
		if (bar.dataset.marquee !== 'true' && messages.length > 1) {
			let activeIndex = 0
			window.setInterval(() => {
				messages[activeIndex].hidden = true
				activeIndex = (activeIndex + 1) % messages.length
				messages[activeIndex].hidden = false
			}, Number(bar.dataset.rotationInterval || 5000))
		}

		bar.querySelector('[data-announcement-dismiss]')?.addEventListener('click', () => {
			bar.hidden = true
			window.localStorage.setItem(storageKey, 'true')
		})
	}

	document.querySelectorAll('[data-announcement-bar]').forEach(initAnnouncement)
	document.addEventListener('shopify:section:load', event => {
		event.target.querySelectorAll('[data-announcement-bar]').forEach(initAnnouncement)
	})
})()
