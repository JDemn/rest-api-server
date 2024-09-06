const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

authSchema.index({ user: 1 });

const Authentication = mongoose.model('Auth', authSchema);

module.exports = Authentication;
