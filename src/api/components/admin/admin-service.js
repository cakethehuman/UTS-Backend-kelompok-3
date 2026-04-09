// admin service akan mengambil repository dari user
const userRepository = require('../users/users-repository');

async function getAllUsers() {
  return userRepository.getUser();
}

async function deleteUser(id) {
  return userRepository.deleteUser(id);
}

async function updateUserRole(id, role) {
  return userRepository.updateUserRole(id, role);
}

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
};
