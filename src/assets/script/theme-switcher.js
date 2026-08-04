class ThemeSwitcher extends HTMLElement {
	constructor() {
		super();
		this._theme = localStorage.getItem('mlut-theme') || 'auto';
		this.applyTheme(this._theme);
	}

	connectedCallback() {
		this._activeClass = this.getAttribute('active-btn-css') || '';
		this._buttons = [...this.querySelectorAll('[data-theme]')];
		if (this._buttons.length === 0) return;

		this._updateActiveButton(this._theme);
		this._updateHighlightTheme(this._theme);

		this.addEventListener("click", (e) => {
			const button = e.target.closest('[data-theme]');
			if (!button || !button.dataset.theme) return;
			this.setTheme(button.dataset.theme);
		});
	}

	applyTheme(theme) {
		const html = document.documentElement;
		html.classList.remove('theme-dark', 'theme-light');
		if (theme === 'dark' || theme === 'light') {
			html.classList.add(`theme-${theme}`);
		}
	}

	setTheme(theme) {
		if (theme === this._theme) return;
		this._theme = theme;
		localStorage.setItem('mlut-theme', theme);
		this.applyTheme(theme);
		this._updateActiveButton(theme);
		this._updateHighlightTheme(theme);
	}

	_updateActiveButton(theme) {
		this._buttons.forEach((btn) => {
			const isActive = btn.dataset.theme === theme;
			btn.classList.toggle(this._activeClass, isActive);
			btn.disabled = isActive;
		});
	}

	_updateHighlightTheme(theme) {
		const effectiveTheme = (theme === 'auto')
			? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			: theme;

		const lightLink = document.getElementById('hljs-light');
		const darkLink = document.getElementById('hljs-dark');
		if (!lightLink || !darkLink) return;

		if (effectiveTheme === 'dark') {
			lightLink.setAttribute('media', 'not all');
			darkLink.setAttribute('media', 'all');
		} else {
			lightLink.setAttribute('media', 'all');
			darkLink.setAttribute('media', 'not all');
		}
	}
}

customElements.define('theme-switcher', ThemeSwitcher);
