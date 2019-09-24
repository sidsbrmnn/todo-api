const mongoose = require('mongoose');

const Todo = mongoose.model(
  'todo',
  new mongoose.Schema({
    text: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  })
);

module.exports = Todo;
