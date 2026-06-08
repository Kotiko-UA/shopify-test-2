(function () {
	const SELECTORS = {
		input: '[data-predictive-search-input]',
		results: '[data-predictive-search-results]',
	};

	class PredictiveSearch extends HTMLElement {
		constructor() {
			super();

			this.input = this.querySelector(SELECTORS.input);
			this.results = this.querySelector(SELECTORS.results);
			this.predictiveSearchUrl = this.dataset.predictiveSearchUrl;
			this.resourceTypes = this.dataset.predictiveSearchTypes || 'product,page,article';
			this.resourceLimit = this.dataset.predictiveSearchLimit || '6';
			this.abortController = null;

			this.onInput = this.debounce(this.onInput.bind(this), 300);
			this.onDocumentClick = this.onDocumentClick.bind(this);
		}

		connectedCallback() {
			if (!this.input || !this.results || !this.predictiveSearchUrl) return;

			this.input.addEventListener('input', this.onInput);
			this.input.addEventListener('focus', this.onInput);
			document.addEventListener('click', this.onDocumentClick);
		}

		disconnectedCallback() {
			this.input?.removeEventListener('input', this.onInput);
			this.input?.removeEventListener('focus', this.onInput);
			document.removeEventListener('click', this.onDocumentClick);
			this.abortController?.abort();
		}

		async onInput() {
			const searchTerm = this.input.value.trim();

			if (searchTerm.length < 2) {
				this.close();
				return;
			}

			await this.getSearchResults(searchTerm);
		}

		async getSearchResults(searchTerm) {
			this.abortController?.abort();
			this.abortController = new AbortController();

			const params = new URLSearchParams({
				q: searchTerm,
				section_id: 'predictive-search',
				'resources[type]': this.resourceTypes,
				'resources[limit]': this.resourceLimit,
				'resources[options][unavailable_products]': 'last',
			});

			try {
				const response = await fetch(`${this.predictiveSearchUrl}?${params}`, {
					signal: this.abortController.signal,
				});

				if (!response.ok) throw new Error(`Predictive search failed: ${response.status}`);

				const text = await response.text();
				const html = new DOMParser().parseFromString(text, 'text/html');
				const section = html.querySelector('#shopify-section-predictive-search');

				if (!section || section.innerHTML.trim() === '') {
					this.close();
					return;
				}

				this.results.innerHTML = section.innerHTML;
				this.updateSubmitLink(searchTerm);
				this.open();
			} catch (error) {
				if (error.name === 'AbortError') return;

				this.close();
				console.error(error);
			}
		}

		open() {
			this.results.hidden = false;
			this.input.setAttribute('aria-expanded', 'true');
		}

		close() {
			this.results.hidden = true;
			this.input.setAttribute('aria-expanded', 'false');
		}

		updateSubmitLink(searchTerm) {
			const submitLink = this.results.querySelector('.predictive-search-results__submit');
			const form = this.input.form;

			if (!submitLink || !form) return;

			const params = new URLSearchParams(new FormData(form));
			params.set('q', searchTerm);

			submitLink.href = `${form.action}?${params}`;
		}

		onDocumentClick(event) {
			if (this.contains(event.target)) return;

			this.close();
		}

		debounce(callback, wait) {
			let timeoutId;

			return (...args) => {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => callback(...args), wait);
			};
		}
	}

	if (!customElements.get('predictive-search')) {
		customElements.define('predictive-search', PredictiveSearch);
	}
})();
