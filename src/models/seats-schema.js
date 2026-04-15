module.exports = (db) =>
	db.model(
		'Seats',
		new db.Schema({
			gameId: {
				type: String,
				required: true,
			},
			seatNumber: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			isBooked: {
				type: Boolean,
				required: true,
			},
		})
	);