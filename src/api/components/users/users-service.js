const usersRepository = require('./users-repository');

async function getUsers() {
	return usersRepository.getUsers();
}

async function getUser(id) {
	return usersRepository.getUser(id);
}

async function getUserByEmail(email) {
	return usersRepository.getUserByEmail(email);
}

async function addCredits(id, amount) {
	const user = await usersRepository.getUser(id);
	const newCredit = user.credit + amount;
	return usersRepository.updateUser(id, newCredit);
}

async function emailExists(email) {
	const user = await usersRepository.getUserByEmail(email);
	return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName, credit) {
	return usersRepository.createUser(email, password, fullName, credit);
}

async function updateUser(id, email, fullName) {
	return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
	return usersRepository.deleteUser(id);
}

module.exports = {
	getUsers,
	getUser,
	getUserByEmail,
	addCredits,
	emailExists,
	createUser,
	updateUser,
	deleteUser,
};
