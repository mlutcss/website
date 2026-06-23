class CopyCode extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const button = this.querySelector(".copy-btn");
		const codeSlot = this.querySelector("code");
		if (!button || !codeSlot) return;

		button.addEventListener("click", async () => {
			const text = codeSlot.textContent.trim();
			try {
				await navigator.clipboard.writeText(text);
			} catch (err) {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
		});
	}
}



class ToggleTab extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const tabs = this.querySelectorAll(".tab");
		const extraSteps = this.querySelectorAll(".extra-step");

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {

				tabs.forEach((t) => t.classList.remove("Bdbc#394EB6"));

				tab.classList.add("Bdbc#394EB6");

				const tabType = tab.dataset.tab;
				if (tabType === "sass") {
					extraSteps.forEach((step) => step.classList.remove("D-n"));
				} else {
					extraSteps.forEach((step) => step.classList.add("D-n"));
				}
			});
		});
	}
}


customElements.define("copy-code", CopyCode);
customElements.define("toggle-tab", ToggleTab);
