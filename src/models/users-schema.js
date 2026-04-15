module.exports = (db) =>
  db.model(
    'Users',
    new db.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      credit: {
        type: Number,
        required: true,
        default: 0
      }
    },
    {
      timestamps: true
    }
  )
  );
