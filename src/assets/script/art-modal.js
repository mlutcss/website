export class ArtModal extends HTMLElement {
	constructor() {
		super();
		this._overlay = null;
		this._container = null;
		this._contentContainer = null;
		this._closeBtn = null;
		this._sandboxLink = null;
		this.shareBtn = null;
		this._onShare = null;
		this._currentArtId = null;
		this._handleKeydown = (e) => {
			if (e.key === "Escape") {
				this.close();
			}
		};
	}

	connectedCallback() {
		this._overlay = this.querySelector(".art-modal-overlay");
		this._container = this.querySelector(".modal-container");
		this._contentContainer = this.querySelector(".art-modal-content");
		this._closeBtn = this.querySelector(".art-modal-close");
		this._sandboxLink = this.querySelector(".art-modal-sandbox");
		this.shareBtn = this.querySelector(".art-modal-share");

		this._overlay.addEventListener("click", (e) => {
			if (e.target === this._overlay) this.close();
		});
		this._closeBtn.addEventListener("click", () => this.close());
		this.shareBtn.addEventListener("click", () => {
			if (this._onShare) this._onShare(this._currentArtId);
		});
	}

	open(artHTML, artId, bgValue, onShare) {
		if (!this._contentContainer) return;

		if (this._container) {
			this._container.style.backgroundColor = '';
		}

		this._currentArtId = artId;
		this._onShare = onShare;

		if (this._sandboxLink) {
			this._sandboxLink.href = `http://play.mlut.style/?art=${artId}`;
		}

		if (this._container && bgValue) {
			this._container.style.backgroundColor = bgValue;
		}

		this._contentContainer.innerHTML = artHTML;
		this._overlay.classList.remove("O0", "Pne");
		this._overlay.classList.add("O1", "Pne-a");
		document.addEventListener("keydown", this._handleKeydown);
	}

	close() {
		if (!this._overlay) return;

		document.removeEventListener("keydown", this._handleKeydown);
		this._overlay.classList.remove("O1", "Pne-a");
		this._overlay.classList.add("O0", "Pne");
		this._container.style.backgroundColor = '';
		this._contentContainer.innerHTML = "";
	}
}

customElements.define("art-modal", ArtModal);
