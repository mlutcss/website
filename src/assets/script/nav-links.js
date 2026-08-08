class NavLinks extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		const burger = this.querySelector('#menu-toggle');
		if (!burger) return;

		this.addEventListener('click', (e) => {
			const link = e.target.closest('a');
			if (link) {
				burger.checked = false;
				document.body.classList.remove('Ov-h');
			}
		});

		burger.addEventListener('change', () => {
			document.body.classList.toggle('Ov-h', burger.checked);
		});
	}
}

customElements.define('nav-links', NavLinks);