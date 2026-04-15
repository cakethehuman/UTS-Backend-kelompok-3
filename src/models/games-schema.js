module.exports = (db) =>
	db.model(
		'Games',
		new db.Schema({
			homeTeam: String,
			awayTeam: String,
			date: Date,
			status: String,
		})
	);
