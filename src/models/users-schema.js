module.exports = (db) =>
	db.model(
		'Users',
		new db.Schema({
			email: String,
			password: String,
			fullName: String,
			role: String,
		})
	);
