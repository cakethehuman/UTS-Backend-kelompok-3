module.exports = (db) =>
  db.model(
    'tickets',
    db.Schema({
      match : {
        type: String,
        required: true,
      },
      seat : {
        type: String,
        required: true
      },
      price : {
        type: Number,
        required: true
      }
    })
  );
