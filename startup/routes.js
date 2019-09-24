const express = require('express');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/todos', require('../routes/todos'));
  app.use('/api/users', require('../routes/users'));

  app.all('*', (req, res) => {
    res.status(404).send('Invalid route');
  });
  app.use(require('../middlewares/error'));
};
