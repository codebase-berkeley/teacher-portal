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
        callbackURL: '/auth/google/callback'
      },
      async (token, refreshToken, profile, done) => {
        const check = await db.query(
          'SELECT * FROM users WHERE users.email = $1',
          [profile.emails[0].value]
        );
        if (check.rowCount === 0) {
          db.query(
            'INSERT INTO users (email, first_name, last_name, token, google_id) VALUES ($1, $2, $3, $4, $5)',
            [
              profile.emails[0].value,
              profile.name.givenName,
              profile.name.familyName,
              token,
              profile.id
            ]
          );
        } else {
          db.query(
            'INSERT INTO users (token, google_id) VALUES ($1, $2) WHERE users.email = $3;',
            [token, profile.id, profile.emails[0].value]
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
