class ToggleTab extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const activeClass = this.getAttribute("active-tab") || '';
		const tabs = this.querySelectorAll(".tab");
		const extraSteps = this.querySelectorAll(".extra-step");

		if (!tabs.length || !extraSteps.length) return;

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				tabs.forEach((t) => t.classList.remove(activeClass));
				tab.classList.add(activeClass);

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

customElements.define("toggle-tab", ToggleTab);