import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';

const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css';
if (!document.querySelector(`link[href*="swiper-bundle.min.css"]`)) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = swiperCss;
	document.head.appendChild(link);
}

class ArtsSlider extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const swiperContainer = this.querySelector('.swiper');
		if (!swiperContainer) return;

		this.swiper = new Swiper(swiperContainer, {
			navigation: {
				nextEl: '.next',
				prevEl: '.prev'
			},
			loop: true,
			speed: 300,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			simulateTouch: false,
			allowTouchMove: true,
			autoplay: true,
			grabCursor: false
		});
	}
}

customElements.define('arts-slider', ArtsSlider);