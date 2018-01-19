const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);
app.use(morganToolkit());

const puppies = require('./routers/puppies');
app.use('/puppies', puppies);
app.use('*', (req, res) => res.end());

const port = 4000;
const host = 'localhost';
app.listen.apply(app, [port, host]);
console.log(`Listening: http://${host}:${port}\n`);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }

  res.json(err);
});
