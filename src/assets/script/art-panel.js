export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.link = window.location.href
	}

	connectedCallback() {
		this.highlightTargetArt();
		this.button = this.querySelector(`#${this.id}-link-button`);
		this.button.addEventListener('click', () => this.copyArtLink())
	}

	copyArtLink() {
		const span = this.button.querySelector('.button-text')
		this.link = this.link.split('#')[0] + `#${this.id}`
		navigator.clipboard.writeText(this.link)
		span.textContent = 'Copied!'
		setTimeout(() => {
			span.textContent = 'Share';
		}, 2000)
	}

	highlightTargetArt() {
		this.classList.add('Bxsd1;1;10;2;$brand_t', 'Bd1;s;$brand_t', 'Zi19_t')
		setTimeout(() => {
			this.classList.remove('Bxsd1;1;10;2;$brand_t', 'Bd1;s;$brand_t', 'Zi19_t')
		},5000)
	}
}

customElements.define('art-panel', ArtPanel);