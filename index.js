const port = process.env.PORT || 1000;

const listen = require('./src/router');

listen(port);