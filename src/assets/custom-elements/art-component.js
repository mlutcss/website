const experimentClass = 'Ps-a T0 L0 M0 -Sz100p ^:h_Bgc#f00*0.5';

export class ArtComponent extends HTMLElement {
	static observedAttributes = ['artId', 'art-background']

	constructor() {
		super();
	}

	connectedCallback() {
		const p = document.createElement('p')
		experimentClass.split(' ').forEach(c => {
			p.classList.add(c)
		})
		this.appendChild(p)
		this.style.position = "relative"
		this.classList.add('-Ctx')
	}
}

customElements.define('art-component', ArtComponent);