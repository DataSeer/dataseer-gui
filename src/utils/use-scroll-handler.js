const ScrollHandler = (element) => {
	if (typeof(element) == 'undefined' && element == null) return
	
	setTimeout(() => {
		window.scrollTo({
			behavior: element ? 'smooth' : 'auto',
			top: element ? element.offsetTop : 0
		});
	}, 100);

	return null;
};

export default ScrollHandler;
