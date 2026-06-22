;(function () {
	function parseVariants(form) {
		const source = form.closest('.product-details')?.querySelector('[data-product-variants]')

		if (!source) return []

		try {
			return JSON.parse(source.textContent)
		} catch (error) {
			console.error('Could not parse product variants:', error)
			return []
		}
	}

	function selectedOptions(form) {
		return [...form.querySelectorAll('[data-product-option]')].map(option =>
			option.querySelector('input:checked')?.value,
		)
	}

	function findVariant(form, variants) {
		const options = selectedOptions(form)

		return variants.find(variant =>
			variant.options.every((option, index) => option === options[index]),
		)
	}

	function inventoryText(form, variant) {
		const inventory = form.closest('.product-details')?.querySelector('[data-product-inventory]')

		if (!inventory) return
		if (!variant?.available) {
			inventory.textContent = inventory.dataset.outOfStockText
			return
		}

		const threshold = Number(inventory.dataset.threshold || 0)
		const quantity = Number(variant.inventory_quantity || 0)
		const tracksInventory = Boolean(variant.inventory_management)

		if (tracksInventory && quantity > 0 && quantity <= threshold) {
			inventory.textContent = inventory.dataset.lowStockTemplate.replace('COUNT', quantity)
			return
		}

		inventory.textContent = inventory.dataset.inStockText
	}

	function updateVariant(form, variant) {
		const details = form.closest('.product-details')
		const variantInput = form.querySelector('[data-product-variant-id]')
		const submit = form.querySelector('[type="submit"]')
		const price = details?.querySelector('[data-product-price]')
		const comparePrice = details?.querySelector('[data-product-compare-price]')
		const pickup = details?.querySelector('[data-product-pickup]')
		const formatMoney = window.themeCart?.formatMoney
		const currency = form.dataset.currency

		if (variantInput) variantInput.value = variant?.id || ''

		if (submit) {
			submit.disabled = !variant?.available
			submit.value = !variant
				? form.dataset.unavailableText
				: variant.available
					? form.dataset.addToCartText
					: form.dataset.soldOutText
		}

		if (variant && formatMoney) {
			if (price) price.textContent = formatMoney(variant.price, currency)

			if (comparePrice) {
				const hasComparePrice = Number(variant.compare_at_price) > Number(variant.price)
				comparePrice.hidden = !hasComparePrice
				comparePrice.textContent = hasComparePrice
					? formatMoney(variant.compare_at_price, currency)
					: ''
			}
		}

		if (pickup) pickup.hidden = !variant?.pickup_available
		inventoryText(form, variant)

		if (variant?.id) {
			const url = new URL(window.location.href)
			url.searchParams.set('variant', variant.id)
			window.history.replaceState({}, '', url)
		}

		form.dispatchEvent(
			new CustomEvent('product:variant-change', {
				bubbles: true,
				detail: { variant },
			}),
		)
	}

	function initVariantSelectors(container = document) {
		container.querySelectorAll('[data-product-main-form]').forEach(form => {
			if (form.dataset.variantSelectorInitialized === 'true') return

			const variants = parseVariants(form)
			if (variants.length === 0) return

			form.dataset.variantSelectorInitialized = 'true'
			form.addEventListener('change', event => {
				if (!event.target.matches('[data-product-option] input')) return
				updateVariant(form, findVariant(form, variants))
			})
		})
	}

	initVariantSelectors()
	document.addEventListener('shopify:section:load', event => initVariantSelectors(event.target))
})()
