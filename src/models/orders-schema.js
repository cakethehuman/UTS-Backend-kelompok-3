/* eslint-disable prettier/prettier */
module.exports = (db) =>
	db.model(
		'Orders',
		new db.Schema({
			userId: {
				type: db.Schema.Types.ObjectId,
				ref: 'Users',
				required: true,
			},
			gameId: {
				type: db.Schema.Types.ObjectId,
				ref: 'Games',
				required: true,
			},
			seatId: {
				type: db.Schema.Types.ObjectId,
				ref: 'Seats',
				required: true,
			},
			status: {
				type: String,
				enum: ['pending', 'paid', 'cancelled', 'expired'],
				default: 'pending',
			},
		})
	);
