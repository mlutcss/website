import './art-modal.js';

const hightlightCss = 'Bxsd1;1;10;2;$brand';
const modal = document.querySelector('art-modal');

export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.link = window.location.href;
	}

	connectedCallback() {
		this.modal = modal;

		if (location.hash.slice(1) === this.id) {
			this.highlightTargetArt();
		}

		this.button = this.querySelector('.link-button');
		this.button.addEventListener('click', () => this.copyArtLink(this.id, this.button));

		this.addEventListener('click', (e) => {
			if (e.target.closest('.link-button, .sandbox-button')) return;
			this.openModal();
		});
	}

	openModal() {
		if (!this.modal) return;

		const artDiv = this.querySelector('.art');
		if (!artDiv) return;
		const artHtml = artDiv.outerHTML;
		const bgValue = this.style.backgroundColor;
		const sandboxUrl = this.querySelector('.sandbox-button')?.href;
		this.modal.open(artHtml, this.id, bgValue, sandboxUrl, (artId) => this.copyArtLink(artId, this.modal.shareBtn));
	}

	copyArtLink(artId, button) {
		const link = window.location.href.split('#')[0] + '#' + artId;

		navigator.clipboard.writeText(link)
		.then(() => {
			const icon = button.querySelector('.copy-icon');
			const tickIcon = button.querySelector('.tick-icon');

			if (icon && tickIcon) {
				icon.classList.add('D-n');
				tickIcon.classList.remove('D-n');
				setTimeout(() => {
					icon.classList.remove('D-n');
					tickIcon.classList.add('D-n');
				}, 2000);
				return;
			}

			const btnIcon = button.querySelector('.button-icon');
			const btnText = button.querySelector('.button-text');
			if (btnIcon && btnText) {
				const originalText = btnText.textContent;
				btnIcon.classList.add('D-n');
				btnText.textContent = 'Copied!';
				setTimeout(() => {
					btnIcon.classList.remove('D-n');
					btnText.textContent = originalText;
				}, 2000)
			}
		})
		.catch(err => console.error('Copy failed', err));
	}

	highlightTargetArt() {
		this.classList.add(hightlightCss);
		setTimeout(() => this.classList.remove(hightlightCss), 5000);
	}
}

customElements.define('art-panel', ArtPanel);