async function emailMatched(oldEmail, newEmail) {
	return oldEmail === newEmail;
}

module.exports = {
	emailMatched,
};
