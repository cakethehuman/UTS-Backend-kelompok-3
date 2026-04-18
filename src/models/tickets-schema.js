module.exports = (db) =>
	db.model(
		'Tickets',
		new db.Schema({
			userInfo: {
				type: db.Schema.Types.ObjectId,
				ref: 'Users',
				required: true,
			},
			gameInfo: {
				type: db.Schema.Types.ObjectId,
				ref: 'Games',
				required: true,
			},
			seatInfo: {
				type: db.Schema.Types.ObjectId,
				ref: 'Seats',
				required: true,
			},
		})
	);
