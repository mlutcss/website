import './art-modal.js';

const hightlightCss = 'Bxsd1;1;10;2;$brand';
const modal = document.querySelector('art-modal');

export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.link = window.location.href;
	}

	connectedCallback() {
		if (!modal) {
		this.modal = document.querySelector('art-modal');
		}
		this.modal = modal;

		if (location.hash.slice(1) === this.id) {
			this.highlightTargetArt();
		}

		this.button = this.querySelector('.link-button');
		if (this.button) {
			this.button.addEventListener('click', () => this.copyArtLink(this.id, this.button));
		}

		this.addEventListener('click', (e) => {
			if (e.target.closest('.link-button, .sandbox-button')) return;
			this.openModal();
		});
	}

	openModal() {
		if (!this.modal) return;

		const artDiv = this.querySelector('.art');
		if (!artDiv) return;
		const artHTML = artDiv.outerHTML;
		const bgClass = this.getAttribute('data-bg-class');
		this.modal.open(artHTML, this.id, bgClass, (artId) => this.copyArtLink(artId, this.modal.shareBtn));
	}

	copyArtLink(artId, button) {
		const link = window.location.href.split('#')[0] + '#' + artId;

		navigator.clipboard.writeText(link)
		.then(() => {
			const icon = button.querySelector('.copy-icon');
			const copyText = button.querySelector('.copy-text');

			if (icon && copyText) {
				icon.classList.add('D-n');
				copyText.classList.remove('D-n');
				setTimeout(() => {
					icon.classList.remove('D-n');
					copyText.classList.add('D-n');
				}, 2000);
				return;
			}

			const svg = button.querySelector('svg');
			const span = button.querySelector('.button-text');
			if (svg) svg.classList.add('D-n');
			if (span) span.textContent = 'Copied!';
			setTimeout(() => {
				if (svg) svg.classList.remove('D-n');
				if (span) span.textContent = 'Share';
			}, 2000);
		})
		.catch(err => console.error('Copy failed', err));
	}

	highlightTargetArt() {
		this.classList.add(hightlightCss);
		setTimeout(() => this.classList.remove(hightlightCss), 5000);
	}
}

customElements.define('art-panel', ArtPanel);