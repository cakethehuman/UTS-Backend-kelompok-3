module.exports = (db) =>
  db.model(
    'games',
    new db.Schema({
      gameId: {
        type: Number,
        required: true,
        unique: true,
      },

      homeTeam: {
        id: Number,
        name: String,
      },

      awayTeam: {
        id: Number,
        name: String,
      },

      date: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: ['scheduled', 'finished'],
        default: 'scheduled',
      },
    })
  );