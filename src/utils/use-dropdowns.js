const clearDropdown = function(dropdown) {
	dropdown.classList.remove('is-active');
}

const clearAllDropdowns = function(event) {
	const activeDropdowns = document.querySelectorAll('.dropdown-holder.is-active');

	if (activeDropdowns) {
		activeDropdowns.forEach((activeDropdown) => {
			if (activeDropdown.contains(event.target)) return;
			activeDropdown.classList.remove('is-active');
		});
	}
}


export {
	clearDropdown,
	clearAllDropdowns
}