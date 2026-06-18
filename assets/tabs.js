(() => {
	const getTabButtons = (tabs) => Array.from(tabs.querySelectorAll('[data-tab-button]'))

	const activateTab = (tabs, activeButton, focusButton = false) => {
		const activePanelId = activeButton.getAttribute('aria-controls')

		getTabButtons(tabs).forEach((button) => {
			const isActive = button === activeButton

			button.classList.toggle('tabs__button--active', isActive)
			button.setAttribute('aria-selected', String(isActive))
			button.tabIndex = isActive ? 0 : -1
		})

		tabs.querySelectorAll('[data-tab-item]').forEach((item) => {
			const panel = item.querySelector('[data-tab-panel]')
			const isActive = panel?.id === activePanelId

			item.hidden = !isActive
			if (panel) panel.hidden = !isActive
		})

		if (focusButton) activeButton.focus()
	}

	const handleKeyboardNavigation = (event, tabs) => {
		const buttons = getTabButtons(tabs)
		const currentIndex = buttons.indexOf(event.target)

		if (currentIndex === -1) return

		const isRtl = getComputedStyle(tabs).direction === 'rtl'
		let nextIndex

		switch (event.key) {
			case 'ArrowRight':
				nextIndex = currentIndex + (isRtl ? -1 : 1)
				break
			case 'ArrowLeft':
				nextIndex = currentIndex + (isRtl ? 1 : -1)
				break
			case 'Home':
				nextIndex = 0
				break
			case 'End':
				nextIndex = buttons.length - 1
				break
			default:
				return
		}

		event.preventDefault()
		nextIndex = (nextIndex + buttons.length) % buttons.length
		activateTab(tabs, buttons[nextIndex], true)
	}

	const initTabs = (container = document) => {
		const tabSets = container.matches?.('[data-tabs]')
			? [container]
			: container.querySelectorAll('[data-tabs]')

		tabSets.forEach((tabs) => {
			if (tabs.dataset.tabsInitialized === 'true') return

			const tabList = tabs.querySelector('[data-tab-list]')
			const tabItems = tabs.querySelectorAll('[data-tab-item]')

			if (!tabList || tabItems.length === 0) return

			tabItems.forEach((item) => {
				const button = item.querySelector(':scope > [data-tab-button]')
				if (button) tabList.append(button)
			})

			const buttons = getTabButtons(tabs)
			if (buttons.length === 0) return

			tabs.dataset.tabsInitialized = 'true'
			activateTab(tabs, buttons[0])

			tabs.addEventListener('click', (event) => {
				const button = event.target.closest('[data-tab-button]')
				if (button && tabs.contains(button)) activateTab(tabs, button)
			})

			tabs.addEventListener('keydown', (event) => {
				if (event.target.matches('[data-tab-button]')) {
					handleKeyboardNavigation(event, tabs)
				}
			})
		})
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => initTabs(), { once: true })
	} else {
		initTabs()
	}

	document.addEventListener('shopify:section:load', (event) => initTabs(event.target))
	document.addEventListener('shopify:block:select', (event) => {
		const tabItem = event.target.closest('[data-tab-item]')
		const tabs = tabItem?.closest('[data-tabs]')

		if (!tabItem || !tabs) return

		const tabId = tabItem.dataset.tabId
		const button = getTabButtons(tabs).find((tabButton) => tabButton.dataset.tabId === tabId)

		if (button) activateTab(tabs, button)
	})
})()
