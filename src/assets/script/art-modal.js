export class ArtModal {

	constructor() {
		this.template = document.getElementById("art-card");
		if (!this.template) return;

		const clone = this.template.content.cloneNode(true);
		this.overlay = clone.querySelector(".art-modal-overlay");
		this.contentContainer = clone.querySelector(".art-modal-content");
		this.closeBtn = clone.querySelector(".art-modal-close");
		this.sandboxLink = clone.querySelector(".art-modal-sandbox a");
		this.shareBtn = clone.querySelector(".art-modal-share");

		this.overlay.addEventListener("click", (e) => {
			if (e.target === this.overlay) this.close();
		});
		this.closeBtn.addEventListener("click", () => this.close());
		this.shareBtn.addEventListener("click", () => this.copyArtLink());

		document.body.appendChild(clone);
	}

	copyArtLink() {
		if (!this.currentArtId) return;

		const link = window.location.href.split("#")[0] + "#" + this.currentArtId;
		navigator.clipboard
			.writeText(link)
			.then(() => {
				const span = this.shareBtn.querySelector(".button-text");
				const svg = this.shareBtn.querySelector("svg");

				if (span) span.textContent = "Copied!";
				if (svg) svg.classList.add("D-n");

				setTimeout(() => {
					if (span) span.textContent = "Share";
					if (svg) svg.classList.remove("D-n");
				}, 2000);
			})
			.catch((err) => console.error("Copy failed", err));
	}

	open(artElement, artId) {
		if (!this.contentContainer) return;
		this.currentArtId = artId;
		if (this.sandboxLink) {
			this.sandboxLink.href = `http://play.mlut.style/?art=${artId}`;
		}
		const artClone = artElement.querySelector(".art").cloneNode(true);
		this.contentContainer.textContent = "";
		this.contentContainer.appendChild(artClone);
		this.overlay.classList.remove("O0", "Pne");
		this.overlay.classList.add("O1", "Pne-a");
	}

	close() {
		if (this.overlay) {
			this.overlay.classList.remove("O1", "Pne-a");
			this.overlay.classList.add("O0", "Pne");
			if (this.contentContainer) this.contentContainer.textContent = "";
		}
	}
}

export const artModal = new ArtModal();