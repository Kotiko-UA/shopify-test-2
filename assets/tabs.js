(() => {
	const initTabs = () => {
		document.querySelectorAll('[data-tabs]').forEach((tabs) => {
			if (tabs.dataset.tabsInitialized === 'true') {
				return;
			}

			tabs.dataset.tabsInitialized = 'true';

			tabs.addEventListener('click', (event) => {
				const button = event.target.closest('[data-tab-button]');

				if (!button || !tabs.contains(button)) {
					return;
				}

				const panel = document.getElementById(
					button.getAttribute('aria-controls'),
				);

				tabs.querySelectorAll('[data-tab-button]').forEach((tabButton) => {
					const isActive = tabButton === button;

					tabButton.classList.toggle('tabs__button--active', isActive);
					tabButton.setAttribute('aria-selected', String(isActive));
				});

				tabs.querySelectorAll('[role="tabpanel"]').forEach((tabPanel) => {
					tabPanel.hidden = tabPanel !== panel;
				});
			});
		});
	};

	initTabs();
	document.addEventListener('shopify:section:load', initTabs);
})();
