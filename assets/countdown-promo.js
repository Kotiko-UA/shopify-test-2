(() => {
	if (window.themeCountdownPromoInitialized) return
	window.themeCountdownPromoInitialized = true

	const SELECTOR = '[data-countdown-promo]'
	const pad = value => String(value).padStart(2, '0')

	const resolveEndDate = timer => {
		const evergreenDays = Number(timer.dataset.countdownEvergreenDays || 0)
		if (evergreenDays <= 0) return new Date(timer.dataset.countdownEnd)

		const key = `countdown-end:${timer.dataset.countdownSectionId}`
		const stored = Number(window.localStorage.getItem(key))
		if (Number.isFinite(stored) && stored > 0) return new Date(stored)

		const end = Date.now() + evergreenDays * 86400000
		window.localStorage.setItem(key, String(end))
		return new Date(end)
	}

	const completeCountdown = timer => {
		const action = timer.dataset.countdownCompletionAction
		if (action === 'hide') {
			timer.hidden = true
			return
		}
		if (action === 'message') {
			timer.querySelector('.countdown-promo__timer').hidden = true
			timer.querySelector('.countdown-promo__action')?.setAttribute('hidden', '')
			timer.querySelector('[data-countdown-completion]').hidden = false
			return
		}
		if (action === 'redirect' && timer.dataset.countdownRedirectUrl && !window.Shopify?.designMode) {
			window.location.assign(timer.dataset.countdownRedirectUrl)
		}
	}

	const updateCountdown = (timer, end) => {
		const remaining = Math.max(0, end.getTime() - Date.now())
		const totalSeconds = Math.floor(remaining / 1000)
		const values = {
			days: Math.floor(totalSeconds / 86400),
			hours: Math.floor((totalSeconds % 86400) / 3600),
			minutes: Math.floor((totalSeconds % 3600) / 60),
			seconds: totalSeconds % 60,
		}

		Object.entries(values).forEach(([unit, value]) => {
			timer.querySelector(`[data-countdown-${unit}]`).textContent = pad(value)
		})

		if (remaining === 0) completeCountdown(timer)
		return remaining
	}

	const initCountdowns = (container = document) => {
		container.querySelectorAll(SELECTOR).forEach(timer => {
			if (timer.dataset.countdownInitialized === 'true') return
			timer.dataset.countdownInitialized = 'true'

			const end = resolveEndDate(timer)
			if (Number.isNaN(end.getTime())) {
				timer.querySelector('[data-countdown-invalid]').hidden = false
				return
			}

			if (updateCountdown(timer, end) === 0) return
			const interval = window.setInterval(() => {
				if (updateCountdown(timer, end) === 0) window.clearInterval(interval)
			}, 1000)
		})
	}

	initCountdowns()
	document.addEventListener('shopify:section:load', event => initCountdowns(event.target))
})()
