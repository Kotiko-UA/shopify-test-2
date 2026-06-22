(() => {
	const initStickyAddToCart = () => {
		document.querySelectorAll('[data-sticky-add-to-cart]').forEach((sticky) => {
			if (sticky.dataset.stickyAddToCartInitialized === 'true') {
				return;
			}

			const mainForm = document.querySelector('.product-form .js-product-form');
			const mainSubmit = mainForm?.querySelector('[type="submit"]');
			const mainVariantId = mainForm?.querySelector('[data-product-variant-id]');
			const stickyVariantId = sticky.querySelector(
				'[data-sticky-add-to-cart-variant-id]',
			);
			const stickyPrice = sticky.querySelector('[data-sticky-add-to-cart-price]');
			const stickySubmit = sticky.querySelector('[data-sticky-add-to-cart-submit]');

			if (!mainForm || !mainSubmit || !mainVariantId || !stickyVariantId) {
				return;
			}

			sticky.dataset.stickyAddToCartInitialized = 'true';

			const syncVariant = (variant) => {
				stickyVariantId.value = variant?.id || mainVariantId.value;
				stickySubmit.disabled = variant ? !variant.available : mainSubmit.disabled;

				if (stickyPrice && variant && window.themeCart?.formatMoney) {
					stickyPrice.textContent = window.themeCart.formatMoney(
						variant.price,
						mainForm.dataset.currency,
					);
				}
			};

			const syncVisibility = () => {
				const formBounds = mainForm.getBoundingClientRect();

				sticky.hidden = formBounds.bottom > 0;
			};

			mainForm.addEventListener('product:variant-change', (event) => {
				syncVariant(event.detail?.variant);
			});
			window.addEventListener('scroll', syncVisibility, { passive: true });
			window.addEventListener('resize', syncVisibility);

			syncVariant(null);
			syncVisibility();
		});
	};

	initStickyAddToCart();
	document.addEventListener('shopify:section:load', initStickyAddToCart);
})();
