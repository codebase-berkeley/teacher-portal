const Router = require('express-promise-router');

const passport = require('passport');

const router = new Router();

router.get('/', (req, res) => {
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

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('http://localhost:3000/login');
});

router.get('/google/teacherStatus/:isTeacher', (req, res, next) => {
  const { isTeacher } = req.params;
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: isTeacher
  })(req, res, next);
});

router.get(
  '/google/callback/',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('http://localhost:3000/');
  }
);

module.exports = router;
