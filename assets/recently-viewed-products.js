(() => {
	if (window.themeRecentlyViewedInitialized) return;
	window.themeRecentlyViewedInitialized = true;

	const STORAGE_KEY = 'theme:recently-viewed-products';

	const escapeHtml = (value = '') => {
		const escapeMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
		};

		return String(value ?? '').replace(/[&<>"']/g, (character) => escapeMap[character]);
	};

	const getStoredHandles = () => {
		try {
			return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
		} catch (error) {
			return [];
		}
	};

	const setStoredHandles = (handles) => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
	};

	const formatMoney = (cents) => {
		const currency = window.Shopify?.currency?.active || 'USD';

		return new Intl.NumberFormat(document.documentElement.lang || 'en', {
			style: 'currency',
			currency,
		}).format(cents / 100);
	};

	const getProductCard = (product) => {
		const image = product.featured_image
			? `<img class="recently-viewed-card__image" src="${escapeHtml(
					product.featured_image,
				)}" alt="">`
			: '';

		return `
			<article class="recently-viewed-card">
				<a href="${escapeHtml(product.url)}">${image}</a>
				<div class="recently-viewed-card__content">
					<a class="recently-viewed-card__title" href="${escapeHtml(product.url)}">
						${escapeHtml(product.title)}
					</a>
					<span class="recently-viewed-card__price">${formatMoney(product.price)}</span>
				</div>
			</article>
		`;
	};

	const initRecentlyViewed = async () => {
		const sections = document.querySelectorAll('[data-recently-viewed-products]');

		if (sections.length === 0) {
			return;
		}

		sections.forEach((section) => {
			const currentHandle = section.dataset.currentProductHandle;
			const handles = getStoredHandles().filter((handle) => handle !== currentHandle);

			if (currentHandle) {
				setStoredHandles([currentHandle, ...handles].slice(0, 12));
			}
		});

		await Promise.all(
			[...sections].map(async (section) => {
				if (section.dataset.recentlyViewedLoaded === 'true') {
					return;
				}

				section.dataset.recentlyViewedLoaded = 'true';

				const list = section.querySelector('[data-recently-viewed-products-list]');
				const currentHandle = section.dataset.currentProductHandle;
				const limit = Number(section.dataset.productLimit || 4);
				const handles = getStoredHandles()
					.filter((handle) => handle !== currentHandle)
					.slice(0, limit);

				if (!list || handles.length === 0) {
					return;
				}

				const products = await Promise.all(
					handles.map(async (handle) => {
						try {
							const response = await fetch(
								`${window.Shopify.routes.root}products/${handle}.js`,
							);

							if (!response.ok) {
								return null;
							}

							return response.json();
						} catch (error) {
							return null;
						}
					}),
				);

				const cards = products.filter(Boolean).map(getProductCard).join('');

				if (cards) {
					list.insertAdjacentHTML('beforeend', cards);
				}
			}),
		);
	};

	initRecentlyViewed();
	document.addEventListener('shopify:section:load', initRecentlyViewed);
})();
