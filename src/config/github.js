const passport = require('passport');
const { Strategy } = require('passport-github2');

passport.use(
    'auth-github',
    new Strategy({
        clientID: 'a9cf08e170bb266ce050',
        clientSecret: 'da49f395279c072a596c16d4e735ce7619f27eab',
        callbackURL: "http://localhost:8080/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            done(null, profile)
        }
    )
)
