const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');

const auth = require('../middlewares/auth');

const Todo = require('../models/todo');

const router = express.Router();

router.use('/:id', function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(404).send('Todo item not found');

  next();
});

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ _creator: req.user._id });

  res.send(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  await todo.save();

  res.send(todo);
});

router.put('/:id', auth, async (req, res) => {
  const body = _.pick(req.body, ['text', 'completed']);
  body.completedAt = body.completed ? Date.now() : null;

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, _creator: req.user._id },
    { $set: body },
    { new: true }
  );
  if (!todo) return res.status(404).send('Todo item not found');

  res.send(todo);
});

router.delete('/:id', auth, async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    _creator: req.user._id
  });
  if (!todo) return res.status(404).send('Todo item not found');

  res.send(todo);
});

router.get('/:id', auth, async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    _creator: req.user._id
  });
  if (!todo) return res.status(404).send('Todo item not found');

  res.send(todo);
});
