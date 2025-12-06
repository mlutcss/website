const hero = document.querySelector('#hero-page');
const logo = document.querySelector('#header-logo');

function handleIntersect(entries, observer){
	entries.forEach(entry => {
		if (!entry.isIntersecting){
			logo.style.visibility = "visible";
			logo.style.opacity = 1;
		} else {
			logo.style.opacity = 0;
			setTimeout(() => {
				logo.style.visibility = "hidden";
			}, 200);
		};
	});
};

function createObserver(){
	const options = {
		root: null,
		threshold: "0.15",
		rootMargin: "0px",
	};

	const observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(hero);
};

createObserver();