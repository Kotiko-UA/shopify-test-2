(() => {
	class FaqItem {
		constructor(element) {
			this.element = element
			this.summary = element.querySelector('[data-faq-summary]')
			this.content = element.querySelector('[data-faq-content]')
			this.animation = null
			this.contentAnimation = null
			this.isClosing = false
			this.isExpanding = false

			if (!this.summary || !this.content) return

			this.summary.addEventListener('click', (event) => this.onClick(event))
		}

		get duration() {
			const section = this.element.closest('[data-faq-section]')
			const duration = Number(section?.dataset.animationDuration)

			return Number.isFinite(duration) && duration > 0 ? duration : 450
		}

		onClick(event) {
			event.preventDefault()

			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				this.element.open = !this.element.open
				return
			}

			this.element.style.overflow = 'hidden'

			if (this.isClosing || !this.element.open) {
				this.open()
			} else if (this.isExpanding || this.element.open) {
				this.close()
			}
		}

		open() {
			this.element.style.height = `${this.element.offsetHeight}px`
			this.element.open = true
			delete this.element.dataset.faqClosing

			requestAnimationFrame(() => this.expand())
		}

		expand() {
			this.isExpanding = true
			const startHeight = `${this.element.offsetHeight}px`
			const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`

			this.cancelAnimations()
			this.animation = this.element.animate(
				{ height: [startHeight, endHeight] },
				{ duration: this.duration, easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)' },
			)
			this.contentAnimation = this.content.animate(
				[
					{ opacity: 0, transform: 'translateY(-0.35rem)' },
					{ opacity: 1, transform: 'translateY(0)' },
				],
				{ duration: Math.round(this.duration * 0.75), easing: 'ease-out' },
			)

			this.animation.addEventListener('finish', () => this.finish(true), { once: true })
			this.animation.addEventListener('cancel', () => {
				this.isExpanding = false
			}, { once: true })
		}

		close() {
			this.isClosing = true
			this.element.dataset.faqClosing = 'true'
			const startHeight = `${this.element.offsetHeight}px`
			const endHeight = `${this.summary.offsetHeight}px`

			this.cancelAnimations()
			this.animation = this.element.animate(
				{ height: [startHeight, endHeight] },
				{ duration: this.duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
			)
			this.contentAnimation = this.content.animate(
				[
					{ opacity: 1, transform: 'translateY(0)' },
					{ opacity: 0, transform: 'translateY(-0.35rem)' },
				],
				{ duration: Math.round(this.duration * 0.65), easing: 'ease-in' },
			)

			this.animation.addEventListener('finish', () => this.finish(false), { once: true })
			this.animation.addEventListener('cancel', () => {
				this.isClosing = false
				delete this.element.dataset.faqClosing
			}, { once: true })
		}

		cancelAnimations() {
			this.animation?.cancel()
			this.contentAnimation?.cancel()
		}

		finish(isOpen) {
			this.element.open = isOpen
			this.element.style.height = ''
			this.element.style.overflow = ''
			this.animation = null
			this.contentAnimation = null
			this.isClosing = false
			this.isExpanding = false
			delete this.element.dataset.faqClosing
		}
	}

	const initFaqs = (container = document) => {
		const items = container.matches?.('[data-faq-item]')
			? [container]
			: container.querySelectorAll('[data-faq-item]')

		items.forEach((item) => {
			if (item.dataset.faqInitialized === 'true') return

			item.dataset.faqInitialized = 'true'
			new FaqItem(item)
		})
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => initFaqs(), { once: true })
	} else {
		initFaqs()
	}

	document.addEventListener('shopify:section:load', (event) => initFaqs(event.target))
})()
