// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
function debounce(fn, delay) {
	let timeoutID = null;

	return function() {
		clearTimeout(timeoutID);
		let args = arguments;
		let that = this;
		timeoutID = setTimeout(function() {
			fn.apply(that, args);
		}, delay);
	};
}

export { debounce };
