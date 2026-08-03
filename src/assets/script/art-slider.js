import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';

const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css';
if (!document.querySelector(`link[href*="swiper-bundle.min.css"]`)) {
	const link = document.createElement("link");
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

		const wrapper = swiperContainer.querySelector('.swiper-wrapper');
		wrapper?.classList.remove("carousel-track");
		const slides = swiperContainer.querySelectorAll('.swiper-slide');
		slides.forEach((slide) => slide.classList.remove("carousel-slide"));

		this.swiper = new Swiper(swiperContainer, {
			navigation: {
				nextEl: '.next',
				prevEl: '.prev',
			},
			loop: true,
			speed: 300,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			simulateTouch: false,
			allowTouchMove: true,
			autoplay: true,
			grabCursor: false,
		});

		this.querySelector('.prev')?.classList.remove('O0', 'Vs-h');
		this.querySelector('.next')?.classList.remove('O0', 'Vs-h');
	}
}

customElements.define('arts-slider', ArtsSlider);
