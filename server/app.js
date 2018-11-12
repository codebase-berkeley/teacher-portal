const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(fileUpload());
app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

app.get('/static/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(`${__dirname}/static/${filename}`));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

module.exports = app;
