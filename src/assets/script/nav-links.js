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
			}
		});
	}
}

customElements.define('nav-links', NavLinks);