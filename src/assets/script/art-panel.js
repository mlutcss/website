import { artModal } from "./art-modal.js";

const hightlightCss = "Bxsd1;1;10;2;$brand";

export class ArtPanel extends HTMLElement {
	constructor() {
		super();
		this.link = window.location.href;
	}

	connectedCallback() {
		if (location.hash.slice(1) === this.id) {
			this.highlightTargetArt();
		}
		this.button = this.querySelector(`.link-button`);
		this.button.addEventListener("click", () => this.copyArtLink());
		this.addEventListener("click", (e) => {
			if (e.target.closest(".link-button, a")) return;
			artModal.open(this, this.id);
		});
	}

	copyArtLink() {
		const icon = this.button.querySelector(".copy-icon");
		const text = this.button.querySelector(".copy-text");
		if (!icon || !text) return;

		this.link = this.link.split("#")[0] + `#${this.id}`;
		navigator.clipboard.writeText(this.link);

		icon.classList.add("D-n");
		text.classList.remove("D-n");

		setTimeout(() => {
			icon.classList.remove("D-n");
			text.classList.add("D-n");
		}, 2000);
	}

	highlightTargetArt() {
		this.classList.add(hightlightCss);
		setTimeout(() => {
			this.classList.remove(hightlightCss);
		}, 5000);
	}
}

customElements.define("art-panel", ArtPanel);