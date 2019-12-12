const { Schema, model } = require('mongoose');

const Todo = model(
    'todo',
    new Schema({
        text: { type: String, required: true, trim: true },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date, default: null },
        _creator: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    })
);

module.exports = Todo;
