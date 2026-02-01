const hightlightClasses = "Bd1;s;$brand Bxsd1;1;10;2;$brand Zi19"

export class ArtComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.highlightTargetArt()
		const artId = this.getAttribute('id');
		console.log(artId);
		const button = this.querySelector(`#${artId}-link-button`);
		button.addEventListener('click', this.copyArtLink(artId))
	}

	copyArtLink = (artId) => {
		return function() {
			const span = this.querySelector('span')
			let link = window.location.href
			const idPosition = link.indexOf('#')
			if (idPosition > 0) {
				link.replace(
					link.substring(idPosition + 1, link.length )	,
					artId
				)
			} else {
				link += `#${artId}`
			}
			navigator.clipboard.writeText(link)
			span.innerText = 'Copied!'
			setTimeout(() => {
				span.innerText = 'Share';
			}, 2000)
		}
	}

	highlightTargetArt(){
		const link = window.location.href
		const idPosition = link.indexOf('#');
		if (this.getAttribute('id') === link.substring(idPosition + 1, link.length )){
			hightlightClasses.split(' ').forEach(c => {
				this.classList.add(c)
			})
			setTimeout(() => {
				hightlightClasses.split(' ').forEach(c => {
					this.classList.remove(c)
				})
			},5000)
		}
	}
}

customElements.define('art-component', ArtComponent);