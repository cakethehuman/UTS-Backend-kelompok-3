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
				venue : {type: String, required: true},
				city: String,
				state: String,
			},
			date: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				enum: ['scheduled', 'live', 'finished', 'cancelled'],
				default: 'scheduled',
				required: true,
			},
		})
	);
