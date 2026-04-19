const randomDateGenerator = require("../utils/randomDate");

module.exports = (db) =>
	db.model(
		'Games',
		new db.Schema({
			homeTeam: {
				teamId: {type: db.Schema.Types.ObjectId, ref: 'Teams', required: true},
				name: {type: String, required: true},
				abbreviation: {type: String, required: true},
			},
			awayTeam: {
				teamId: {type: db.Schema.Types.ObjectId, ref: 'Teams', required: true},
				name: {type: String, required: true},
				abbreviation: {type: String, required: true},
			},
			location: {
				venue: {type: String, required: true},
				city: {type: String, required: true},
				state: {type: String, required: true},
			},
			date: {
				type: Date,
				default: randomDateGenerator,
				required: true,
			},
			status: {
				type: String,
				enum: ['scheduled', 'finished', 'cancelled'],
				default: 'scheduled',
				required: true,
			},
		})
	);
