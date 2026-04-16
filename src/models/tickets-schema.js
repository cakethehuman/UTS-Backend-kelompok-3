/* eslint-disable prettier/prettier */
module.exports = (db) =>
	db.model(
		'Tickets',
		new db.Schema(
			{
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
				price: {
					type: Number,
					required: true,
					min: 0,
				},
				status: {
					type: String,
					enum: ['pending', 'paid', 'used', 'cancelled', 'expired'],
					default: 'pending',
				},
			},
			{
				timestamps: true,
			}
		)
	);
