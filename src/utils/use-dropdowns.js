const clearDropdown = function(dropdown) {
	dropdown.classList.remove('is-active');
}

const clearDropdowns = function() {
	const dropdowns = document.querySelectorAll('.dropdown-holder.is-active');

	if (!dropdowns) return
	
	dropdowns.forEach((dropdown) => {
		clearDropdown(dropdown);
	});
}

const clearDropdownsOnClick = function(event) {
	const dropdowns = document.querySelectorAll('.dropdown-holder.is-active');

	if (!dropdowns) return
	
	dropdowns.forEach((dropdown) => {
		if (dropdown.contains(event.target)) return;
		clearDropdown(dropdown);
	});	
}

export {
	clearDropdown,
	clearDropdowns,
	clearDropdownsOnClick
}