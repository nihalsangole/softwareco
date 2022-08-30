const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
