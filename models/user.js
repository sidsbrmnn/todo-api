const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true }
});

userSchema.method('generateAuthToken', function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email
    },
    process.env.JWT_SECRET
  );

  return token;
});

userSchema.method('hashPassword', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('user', userSchema);

module.exports = User;
