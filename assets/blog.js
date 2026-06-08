(function () {
	const SELECTORS = {
		tagSelect: '[data-blog-tag-select]',
	};

	document.addEventListener('change', (event) => {
		const tagSelect = event.target.closest(SELECTORS.tagSelect);

		if (!tagSelect) return;

		window.location.href = tagSelect.value;
	});
})();
