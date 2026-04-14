module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: {
        type: String,
        required: true,
        unique: true, // making the email unique
        trim: true, // remove extra spaces that either surrounds or ending at beginning
        lowercase: true // stores the input as lowercase
      },
      password: {
        type: String,
        required: true
      },
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },

      
    },
    {
      timestamps: true
    }
    
  ),

  );
