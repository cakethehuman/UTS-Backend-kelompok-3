/* eslint-disable prettier/prettier */
module.exports = (db) =>
	db.model(
		'Tickets',
		new db.Schema({
			match: String,
			seatId: String,
			price: Number,
			date: Date,
			status: String,
		})
	);
