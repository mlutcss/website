export class ArtModal extends HTMLElement {
	constructor() {
		super();
		this.overlay = null;
		this.container = null; 
		this.contentContainer = null;
		this.closeBtn = null;
		this.sandboxLink = null;
		this.shareBtn = null;
		this._onShare = null;
		this._currentArtId = null;
		this._handleKeydown = (e) => {
			if (e.key === 'Escape') {
				this.close();
			}
		};
	}

	connectedCallback() {
		this.overlay = this.querySelector('.art-modal-overlay');
		this.container = this.querySelector('.modal-container');
		this.contentContainer = this.querySelector('.art-modal-content');
		this.closeBtn = this.querySelector('.art-modal-close');
		this.sandboxLink = this.querySelector('.art-modal-sandbox a');
		this.shareBtn = this.querySelector('.art-modal-share .btn');

		if (this.overlay) {
			this.overlay.addEventListener('click', (e) => {
				if (e.target === this.overlay) this.close();
			});
		}
		if (this.closeBtn) {
			this.closeBtn.addEventListener('click', () => this.close());
		}
		if (this.shareBtn) {
			this.shareBtn.addEventListener('click', () => {
				if (this._onShare) this._onShare(this._currentArtId);
			});
		}
	}

	open(artHTML, artId, bgClass, onShare) {
		if (!this.contentContainer) return;

		if (this.container && this._currentBgClass) {
			this.container.classList.remove(this._currentBgClass);
		}

		this._currentArtId = artId;
		this._onShare = onShare;
		this._currentBgClass = bgClass;

		if (this.sandboxLink) {
			this.sandboxLink.href = `http://play.mlut.style/?art=${artId}`;
		}

		if (this.container && bgClass) {
			this.container.classList.add(bgClass);
		}

		this.contentContainer.innerHTML = artHTML;
		this.overlay.classList.remove('O0', 'Pne');
		this.overlay.classList.add('O1', 'Pne-a');
		document.addEventListener('keydown', this._handleKeydown);
	}

  close() {
		if (!this.overlay) return;

		document.removeEventListener('keydown', this._handleKeydown);
		this.overlay.classList.remove('O1', 'Pne-a');
		this.overlay.classList.add('O0', 'Pne');
		if (this.container && this._currentBgClass) {
			this.container.classList.remove(this._currentBgClass);
		}
		if (this.contentContainer) this.contentContainer.innerHTML = '';
	}
}

customElements.define('art-modal', ArtModal);