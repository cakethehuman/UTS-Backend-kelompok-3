module.exports = (db) =>
	db.model(
		'Seats',
		new db.Schema({
			gameId: String,
			seatNumber: String,
			price: Number,
			isBooked: Boolean,
		})
	);
