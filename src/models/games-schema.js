module.exports = (db) =>
	db.model(
		'Games',
		new db.Schema({
			homeTeam: {
				type: db.Schema.Types.ObjectId,
				ref: 'Teams',
				required: true,
			},
			awayTeam: {
				type: db.Schema.Types.ObjectId,
				ref: 'Teams',
				required: true,
			},
			location: {
				type: db.Schema.Types.ObjectId,
				ref: 'Teams',
				required: true,
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
