module.exports = (db) =>
	db.model(
		'Tickets',
		new db.Schema({
			userInfo: {
				userId: {type: db.Schema.Types.ObjectId, ref: 'Users', required: true},
				email: {type: String, required: true},
				fullName: {type: String, required: true},
			},
			gameInfo: {
				gameId: {type: db.Schema.Types.ObjectId, ref: 'Games', required: true},
				homeTeam: {type: String, require: true},
				awayTeam: {type: String, require: true},
			},
			seatInfo: {
				seatId: {type: db.Schema.Types.ObjectId, ref: 'Seats', required: true},
				seatNumber: {type: String, require: true},
				isBooked: {type: Boolean, require: true},
			},
		})
	);
