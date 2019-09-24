module.exports = function(err, req, res, next) {
  console.log(`${err.name}: ${err.message}`);

  res.status(500).send('Something went wrong');
};
