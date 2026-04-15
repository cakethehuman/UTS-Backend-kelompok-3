/* eslint-disable prettier/prettier */
module.exports = (db) =>
	db.model(
		'Tickets',
		new db.Schema(
			{
				match: {
					type: String,
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
				date: {
					type: Date,
					required: true,
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