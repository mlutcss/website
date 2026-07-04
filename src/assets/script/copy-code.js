class CopyCode extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const button = this.querySelector(".copy-btn");
		const pre = this.querySelector("pre");
		if (!button || !pre) return;

		button.addEventListener("click", () => {
			const text = pre.textContent.trim();
			navigator.clipboard.writeText(text).catch(() => {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			});
		});
	}
}

customElements.define("copy-code", CopyCode);