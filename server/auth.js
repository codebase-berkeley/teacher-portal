const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const db = require('./db/index');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
      },
      async (req, token, refreshToken, profile, done) => {
        const isTeacher = req.query.state === '1';
        const check = await db.query(
          'SELECT * FROM users WHERE users.email = $1 and users.is_teacher= $2',
          [profile.emails[0].value, isTeacher]
        );
        if (check.rowCount === 0 && isTeacher) {
          db.query(
            'INSERT INTO users (email, first_name, last_name, is_teacher,token, google_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [
              profile.emails[0].value,
              profile.name.givenName,
              profile.name.familyName,
              isTeacher,
              token,
              profile.id
            ]
          );
        } else {
          db.query(
            'UPDATE users SET token=$1, google_id=$2, first_name=$4, last_name=$5 WHERE users.email = $3;',
            [
              token,
              profile.id,
              profile.emails[0].value,
              profile.name.givenName,
              profile.name.familyName
            ]
          );
        }
        return done(null, {
          profile,
          token
        });
      }
    )
  );
};
