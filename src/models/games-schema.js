module.exports = (db) =>
	db.model(
		'Games',
		new db.Schema({
			homeTeam: {
				type: String,
				required: true,
			},
			awayTeam: {
				type: String,
				required: true,
			},
			date: {
				type: String, 
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
		})
	);