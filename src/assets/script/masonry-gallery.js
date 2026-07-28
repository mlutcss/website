class MasonryGallery extends HTMLElement {
	static _libPromise = null;

	constructor() {
		super();
		this._masonry = null;
	}

	connectedCallback() {
		MasonryGallery._loadLibrary().then(() => {
			this._initMasonry();
		});
	}

	disconnectedCallback() {
		if (this._masonry) {
			this._masonry.destroy();
			this._masonry = null;
		}
	}

	static _loadLibrary() {
		if (this._libPromise) return this._libPromise;

		this._libPromise = new Promise((resolve, reject) => {
			if (window.Masonry) {
				resolve();
				return;
			}
			const script = document.createElement("script");
			script.src =
				"https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js";
			script.onload = () => resolve();
			script.onerror = () => reject(new Error("Couldn't load Masonry"));
			document.head.appendChild(script);
		});

		return this._libPromise;
	}

	_initMasonry() {
		const grid = this.querySelector(".masonry");
		if (!grid || !grid.querySelector(".masonry-item")) {
			setTimeout(() => this._initMasonry(), 50);
			return;
		}
		if (this._masonry) return;

		this._masonry = new Masonry(grid, {
			itemSelector: ".masonry-item",
			columnWidth: ".masonry-sizer",
			gutter: 24,
			percentPosition: true,
			horizontalOrder: true,
			transitionDuration: "0.3s",
			stagger: 30,
			resize: true,
		});
	}
}

customElements.define("masonry-gallery", MasonryGallery);
