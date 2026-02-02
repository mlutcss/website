const hightlightCss = "Bxsd1;1;10;2;$brand_t Bd1;s;$brand_t Zi19_t"

export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.artId = this.getAttribute('id')
		this.link = window.location.href
	}

	connectedCallback() {
		this.highlightTargetArt();
		const button = this.querySelector(`#${this.artId}-link-button`);
		button.addEventListener('click', () => this.copyArtLink(button))
	}

	copyArtLink = (button) => {
		const span = button.querySelector('[data-name="button-text"]')
		this.link = this.link.split('#')[0] + `#${this.artId}`
		navigator.clipboard.writeText(this.link)
		span.textContent = 'Copied!'
		setTimeout(() => {
			span.textContent = 'Share';
		}, 2000)
	}

	highlightTargetArt() {
		hightlightCss.split(' ').forEach(c => {
			this.classList.add(c)
		})
		setTimeout(() => {
			hightlightCss.split(' ').forEach(c => {
				this.classList.remove(c)
			})
		},5000)
	}
}

customElements.define('art-panel', ArtPanel);