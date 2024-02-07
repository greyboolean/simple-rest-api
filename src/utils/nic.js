function isValidNic(nic) {
	// Old format (9 digits and 1 letter)
	if (nic.length === 10) {
		const regex = /^[0-9]{9}[vVxX]$/;
		if (!regex.test(nic)) {
			return false;
		}
	}
	// New format (12 digits)
	else if (nic.length === 12) {
		const regex = /^[0-9]{12}$/;
		if (!regex.test(nic)) {
			return false;
		}
	}
	// If length is not equals to 10 or 12
	else {
		return false;
	}

	return true;
}

function convertNic(nic) {
	if (!nic) {
		throw new Error("NIC number not provided");
	}

	if (!isValidNic(nic)) {
		throw new Error("Invalid NIC number");
	}

	let year, genderValue, gender, days, birthDate;

	// First 2 digits represent the year and the next 3 digits represent the gender/day of the year
	if (nic.length === 10) {
		year = 1900 + parseInt(nic.slice(0, 2));
		genderValue = parseInt(nic.slice(2, 5));
		// First 4 digits represent the year and the next 3 digits represent the gender/day of the year
	} else {
		year = parseInt(nic.slice(0, 4));
		genderValue = parseInt(nic.slice(4, 7));
	}

	// For females 500 is added to the day of the year
	if (genderValue > 500) {
		gender = "Female";
		days = genderValue - 500;
	} else {
		gender = "Male";
		days = genderValue;
	}

	// Find the birth date
	birthDate = new Date(year, 0);
	// birthDate.setDate(days - 1);
  birthDate = new Date(birthDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000);
  const birthday = birthDate.toLocaleDateString("en-CA");

	// Return birthday and gender
	return { birthday, gender };
}

module.exports = convertNic;
