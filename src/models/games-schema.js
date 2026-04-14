module.exports = (db) =>
  db.model(
    'Games',
    new db.Schema({
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
