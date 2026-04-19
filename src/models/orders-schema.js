module.exports = (db) =>
	db.model(
		'Orders',
		new db.Schema({
			userId: {type: db.Schema.Types.ObjectId, ref: 'Users', required: true},
			gameId: {type: db.Schema.Types.ObjectId, ref: 'Games', required: true},
			seatId: {type: db.Schema.Types.ObjectId, ref: 'Seats', required: true},
			userInfo: {
				email: {type: String, required: true},
				fullName: {type: String, required: true},
			},
			gameInfo: {
				homeTeam: {type: String, required: true},
				awayTeam: {type: String, require: true},
			},
			seatInfo: {
				seatNumber: {type: String, required: true},
				price: {type: Number, required: true},
			},
			status: {
				type: String,
				enum: ['pending', 'paid', 'cancelled', 'expired', 'requesting cancel'],
				default: 'pending',
			},
		})
	);
