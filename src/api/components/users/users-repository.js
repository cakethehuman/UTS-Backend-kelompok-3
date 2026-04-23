const {Users} = require('../../../models');

async function getUsers() {
	return Users.find({});
}

async function getUser(id) {
	return Users.findById(id);
}

async function addCredits(id, amount) {
	const user = await getUser(id);
	return Users.updateOne({_id: id}, {$set: {credit: newCredit}});
}

async function getUserByEmail(email) {
	return Users.findOne({email});
}

async function getUserByFullName(fullName) {
	return Users.findOne({fullName});
}

async function updateUser(id, newCredit) {
	return Users.updateOne({_id: id}, {$set: {credit: newCredit}});
}

async function createUser(email, password, fullName, credit) {
	return Users.create({email, password, fullName, credit});
}

async function changePassword(id, newPassword) {
	return Users.updateOne({_id: id}, {$set: {password: newPassword}});
}

async function updateUserEmail(id, email) {
	return Users.updateOne({_id: id}, {$set: {email: email}});
}

async function updateUsername(id, name) {
	return Users.updateOne({_id: id}, {$set: {fullName: name}});
}

async function updateUserSession(id) {
	return Users.updateOne({_id: id}, {lastSession: Date.now()});
}

async function deleteUser(id) {
	return Users.deleteOne({_id: id});
}

// bingung
// async function deleteStudentsByLastSession(startDate, endDate) {
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   const result = await Users.deleteMany({
//     role: 'user',
//     lastSession: {
//       $gte: start,
//       $lte: end,
//     },
//   });

//   return result.deletedCount;
// }

module.exports = {
	getUsers,
	getUser,
	addCredits,
	getUserByEmail,
	createUser,
	updateUserEmail,
	updateUsername,
	deleteUser,
	updateUserSession,
	getUserByFullName,
	changePassword,
	updateUser,
};
