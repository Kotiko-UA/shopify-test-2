(function () {
	const SELECTORS = {
		input: '[data-predictive-search-input]',
		results: '[data-predictive-search-results]',
		option: '[data-predictive-search-option]',
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
			this.activeOptionIndex = -1;

			this.onInput = this.debounce(this.onInput.bind(this), 300);
			this.onKeydown = this.onKeydown.bind(this);
			this.onDocumentClick = this.onDocumentClick.bind(this);
		}

		connectedCallback() {
			if (!this.input || !this.results || !this.predictiveSearchUrl) return;

			this.input.addEventListener('input', this.onInput);
			this.input.addEventListener('focus', this.onInput);
			this.input.addEventListener('keydown', this.onKeydown);
			this.results.addEventListener('keydown', this.onKeydown);
			document.addEventListener('click', this.onDocumentClick);
		}

		disconnectedCallback() {
			this.input?.removeEventListener('input', this.onInput);
			this.input?.removeEventListener('focus', this.onInput);
			this.input?.removeEventListener('keydown', this.onKeydown);
			this.results?.removeEventListener('keydown', this.onKeydown);
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
			const abortController = new AbortController();
			this.abortController = abortController;

			const params = new URLSearchParams({
				q: searchTerm,
				section_id: 'predictive-search',
				'resources[type]': this.resourceTypes,
				'resources[limit]': this.resourceLimit,
				'resources[options][unavailable_products]': 'last',
			});

			try {
				this.setBusyState(true);

				const response = await fetch(`${this.predictiveSearchUrl}?${params}`, {
					signal: abortController.signal,
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
				this.prepareOptions();
				this.updateSubmitLink(searchTerm);
				this.open();
			} catch (error) {
				if (error.name === 'AbortError') return;

				this.close();
				console.error(error);
			} finally {
				if (this.abortController === abortController) {
					this.setBusyState(false);
				}
			}
		}

		open() {
			this.results.hidden = false;
			this.input.setAttribute('aria-expanded', 'true');
		}

		close() {
			this.results.hidden = true;
			this.input.setAttribute('aria-expanded', 'false');
			this.activeOptionIndex = -1;
			this.clearActiveOption();
		}

		setBusyState(isBusy) {
			this.input.setAttribute('aria-busy', String(isBusy));
			this.results.setAttribute('aria-busy', String(isBusy));
		}

		getOptions() {
			return [...this.results.querySelectorAll(SELECTORS.option)];
		}

		prepareOptions() {
			this.getResultLinks().forEach((link, index) => {
				link.id = `${this.input.id}-predictive-option-${index}`;
				link.setAttribute('role', 'option');
				link.setAttribute('aria-selected', 'false');
				link.setAttribute('data-predictive-search-option', '');
			});
		}

		getResultLinks() {
			return [
				...this.results.querySelectorAll(
					'.predictive-search-results__link, .predictive-search-results__submit',
				),
			];
		}

		clearActiveOption() {
			this.getOptions().forEach(option => {
				option.setAttribute('aria-selected', 'false');
			});
		}

		setActiveOption(index) {
			const options = this.getOptions();

			if (options.length === 0) return;

			this.clearActiveOption();
			this.activeOptionIndex = (index + options.length) % options.length;

			const activeOption = options[this.activeOptionIndex];
			activeOption.setAttribute('aria-selected', 'true');
			activeOption.focus();
		}

		onKeydown(event) {
			const isOpen = !this.results.hidden;

			if (event.key === 'Escape' && isOpen) {
				event.preventDefault();
				this.close();
				this.input.focus();
				return;
			}

			if (event.key === 'ArrowDown' && isOpen) {
				event.preventDefault();
				this.setActiveOption(this.activeOptionIndex + 1);
				return;
			}

			if (event.key === 'ArrowUp' && isOpen) {
				event.preventDefault();
				this.setActiveOption(this.activeOptionIndex - 1);
				return;
			}

			if (event.key === 'Home' && isOpen && event.target !== this.input) {
				event.preventDefault();
				this.setActiveOption(0);
				return;
			}

			if (event.key === 'End' && isOpen && event.target !== this.input) {
				event.preventDefault();
				this.setActiveOption(this.getOptions().length - 1);
			}
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
