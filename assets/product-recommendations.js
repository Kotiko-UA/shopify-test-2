(() => {
	const initProductRecommendations = () => {
		document
			.querySelectorAll('[data-product-recommendations]')
			.forEach(async (section) => {
				if (section.dataset.productRecommendationsLoaded === 'true') {
					return;
				}

				const list = section.querySelector('[data-product-recommendations-list]');
				const url = section.dataset.recommendationsUrl;

				if (!list || !url || list.children.length > 0) {
					return;
				}

				section.dataset.productRecommendationsLoaded = 'true';

				try {
					const response = await fetch(url);
					const html = await response.text();
					const documentFragment = new DOMParser().parseFromString(
						html,
						'text/html',
					);
					const fetchedList = documentFragment.querySelector(
						'[data-product-recommendations-list]',
					);

					if (!fetchedList || fetchedList.innerHTML.trim() === '') {
						return;
					}

					list.innerHTML = fetchedList.innerHTML;
				} catch (error) {
					console.error('Product recommendations failed:', error);
				}
			});
	};

	initProductRecommendations();
	document.addEventListener('shopify:section:load', initProductRecommendations);
})();
