/* eslint-disable */
import { isBefore, isAfter } from 'date-fns' 

const filterByName = (element, query) => {
	return element?.length ? element.indexOf(query) !== -1 : true;
};

const filterByOrganization = (element, query) => {
	let keepRow = false
	if (!query?.length) return true;

	element.map(entry => {
		const entryID = entry._id
		
		if (query.some((entry) => entry === entryID)) {
			keepRow = true
		}
	})

	return keepRow;
};

const filterByDate = (date, from, to) => {
	const parsedData = new Date(date);
	const parsedFrom = new Date(+from);
	const parsedTo = new Date(+to);

	console.log('date', date);
	console.log('parsedFrom', parsedFrom);
	console.log('parsedTo', parsedTo);

	if (from && !to) {
		return isAfter(parsedData, +from);
	}

	if (!from && to) {
		return isBefore(parsedData, +to);
	}

	if (from && to) {
		return isBefore(parsedData, +to) && isAfter(parsedData, +from);
	}

	return true;
};

export  {
	filterByName,
	filterByDate,
	filterByOrganization
};
