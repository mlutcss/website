const hightlightCss = ["Bd1;s;$brand", "Bxsd1;1;10;2;$brand", "Zi40"]

export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.link = window.location.href
	}

	connectedCallback() {
		if (location.hash.slice(1) === this.id){
			this.highlightTargetArt();
		}
		this.button = this.querySelector(`.link-button`);
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
		this.classList.add(...hightlightCss)
		setTimeout(() => {
			this.classList.remove(...hightlightCss)
		},5000)
	}
}

customElements.define('art-panel', ArtPanel);