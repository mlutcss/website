class NavLinks extends HTMLElement {
	constructor() {
		super();
		this._burger = null;
	}

	connectedCallback() {
		this._burger = this.querySelector('#menu-toggle');

		if (!this._burger) {
			return;
		}

		this._handleResize();
		window.addEventListener('resize', this._handleResize);

		this.addEventListener('click', (e) => {
			const link = e.target.closest('a');

			if (link) {
				this._burger.checked = false;
				document.body.classList.remove('Ov-h');
			}
		});

		this._burger.addEventListener('change', () => {
			document.body.classList.toggle('Ov-h', this._burger.checked);
		});
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this._handleResize);
	}

	_handleResize = () => {
		if (window.innerWidth > 768 && this._burger && this._burger.checked) {
			this._burger.checked = false;
			document.body.classList.remove('Ov-h');
		}
	}
}

customElements.define('nav-links', NavLinks);