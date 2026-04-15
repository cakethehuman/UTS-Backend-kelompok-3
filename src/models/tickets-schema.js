/* eslint-disable prettier/prettier */
module.exports = (db) =>
  db.model(
    'Tickets',
    new db.Schema({
      match : {
        type: String,
        required: true,
      },

      seatId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },

      gameTimeAndDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: ['reserved', 'open'],
        default: 'open',
      },

      ticketStatus: {
        type: String,
        enum: ['active', 'used', 'disabled'],
        default: 'active',
      },
    })
  );
