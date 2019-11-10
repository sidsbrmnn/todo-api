const mongoose = require('mongoose');

module.exports = function() {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Connected to MongoDB');
        });
};
