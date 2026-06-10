(() => {
	const initStickyAddToCart = () => {
		document.querySelectorAll('[data-sticky-add-to-cart]').forEach((sticky) => {
			if (sticky.dataset.stickyAddToCartInitialized === 'true') {
				return;
			}

			const mainForm = document.querySelector('.product-form .js-product-form');
			const mainSubmit = mainForm?.querySelector('[type="submit"]');
			const variantSelect = mainForm?.querySelector('select[name="id"]');
			const stickyVariantId = sticky.querySelector(
				'[data-sticky-add-to-cart-variant-id]',
			);
			const stickyPrice = sticky.querySelector('[data-sticky-add-to-cart-price]');
			const stickySubmit = sticky.querySelector('[data-sticky-add-to-cart-submit]');

			if (!mainForm || !mainSubmit || !variantSelect || !stickyVariantId) {
				return;
			}

			sticky.dataset.stickyAddToCartInitialized = 'true';

			const syncVariant = () => {
				const selectedOption = variantSelect.selectedOptions[0];

				if (!selectedOption) {
					return;
				}

				const isAvailable = selectedOption.dataset.variantAvailable === 'true';

				stickyVariantId.value = selectedOption.value;
				stickySubmit.disabled = !isAvailable;

				if (stickyPrice && selectedOption.dataset.variantPrice) {
					stickyPrice.textContent = selectedOption.dataset.variantPrice;
				}
			};

			const syncVisibility = () => {
				const formBounds = mainForm.getBoundingClientRect();

				sticky.hidden = formBounds.bottom > 0;
			};

			variantSelect.addEventListener('change', syncVariant);
			window.addEventListener('scroll', syncVisibility, { passive: true });
			window.addEventListener('resize', syncVisibility);

			syncVariant();
			syncVisibility();
		});
	};

	initStickyAddToCart();
	document.addEventListener('shopify:section:load', initStickyAddToCart);
})();
