module.exports = (db) =>
  db.model(
    'Teams',
    new db.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
      },

      city: {
        type: String,
      },

      abbreviation: {
        type: String,
        required: true,
      },
    })
  );
