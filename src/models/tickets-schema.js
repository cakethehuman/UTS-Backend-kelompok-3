module.exports = (db) =>
  db.model(
    'tickets',
    db.Schema({
      name : String,
      seat : String,
      price : String
    })
  );
