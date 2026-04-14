const { Users } = require('../../../models');

async function getUsers() {
  return Users.find({});
}

async function getUser(id) {
  return Users.findById(id);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, fullName, role) {
  const currentDate = Date.now();
  return Users.create({ email, password, fullName, role});
}

async function updateUser(id, email, fullName) {
  return Users.updateOne({ _id: id }, { $set: { email, fullName } });
}

async function updateUserSession(id) {
  return Users.updateOne({_id: id}, {lastSession: Date.now()});
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
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
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  updateUserSession,
};
