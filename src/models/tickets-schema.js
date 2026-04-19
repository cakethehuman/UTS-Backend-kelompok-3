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
				homeTeam: {type: String, required: true},
				awayTeam: {type: String, require: true},
			},
			seatInfo: {
				seatId: {type: db.Schema.Types.ObjectId, ref: 'Seats', required: true},
				seatNumber: {type: String, required: true},
				isBooked: {type: Boolean, required: true},
			},
			orderInfo: {
				orderId: {type: db.Schema.Types.ObjectId, ref: "Orders", required: true, unique: true},
			},
		})
	);
