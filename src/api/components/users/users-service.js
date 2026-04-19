const usersRepository = require('./users-repository');

async function addCredits(id, amount) {
	const user = await usersRepository.getUser(id);
	const newCredit = user.credit + amount;
	return usersRepository.updateUser(id, user.email, user.fullName, newCredit);
}

module.exports = {
	addCredits,
};
