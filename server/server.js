const express = require('express');

const app = express();
const passport = require('passport');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const auth = require('./auth');

app.use(passport.initialize());
auth(passport);

app.use(
  cookieSession({
    name: 'session',
    keys: ['SECRECT KEY'],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set'
    });
  } else {
    res.cookie('token', '');
    res.json({
      status: 'session cookie not set'
    });
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
