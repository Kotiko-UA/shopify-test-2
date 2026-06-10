(() => {
	const SELECTOR = '[data-countdown-promo]';

	const pad = (value) => String(value).padStart(2, '0');

	const updateCountdown = (timer) => {
		const end = new Date(timer.dataset.countdownEnd);

		if (Number.isNaN(end.getTime())) {
			return;
		}

		const remaining = Math.max(0, end.getTime() - Date.now());
		const totalSeconds = Math.floor(remaining / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		timer.querySelector('[data-countdown-days]').textContent = pad(days);
		timer.querySelector('[data-countdown-hours]').textContent = pad(hours);
		timer.querySelector('[data-countdown-minutes]').textContent = pad(minutes);
		timer.querySelector('[data-countdown-seconds]').textContent = pad(seconds);
	};

	const initCountdowns = () => {
		document.querySelectorAll(SELECTOR).forEach((timer) => {
			if (timer.dataset.countdownInitialized === 'true') {
				return;
			}

			timer.dataset.countdownInitialized = 'true';
			updateCountdown(timer);
			window.setInterval(() => updateCountdown(timer), 1000);
		});
	};

	initCountdowns();
	document.addEventListener('shopify:section:load', initCountdowns);
})();
