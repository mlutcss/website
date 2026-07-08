class ToggleTab extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const activeClass = this.getAttribute("active-tab-css") || "";
		const tabs = this.querySelectorAll(".tab");
		const extraSteps = this.querySelectorAll(".extra-step");

		if (!tabs.length || !extraSteps.length) return;

		this.addEventListener("click", (e) => {
			const tab = e.target.closest(".tab");
			if (!tab) return;
			
			tabs.forEach((t) => t.classList.remove(activeClass));
			tab.classList.add(activeClass);
			const tabType = tab.dataset.tab;
			if (tabType === "sass") {
				extraSteps.forEach((step) => step.classList.remove("D-n"));
			} else {
				extraSteps.forEach((step) => step.classList.add("D-n"));
			}
		});
	}
}

customElements.define("toggle-tab", ToggleTab);
