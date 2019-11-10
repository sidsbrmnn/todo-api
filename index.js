require('dotenv').config();
const express = require('express');

const app = express();

require('./services/logging')();
require('./services/db')();
require('./services/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
