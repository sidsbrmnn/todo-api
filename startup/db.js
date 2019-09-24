const mongoose = require('mongoose');

module.exports = function() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Connected to MongoDB');
    });
};
