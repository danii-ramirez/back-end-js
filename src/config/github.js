const passport = require('passport');
const { Strategy } = require('passport-github2');
const User = require('../dao/models/modelUser');

passport.use(
    'auth-github',
    new Strategy({
        clientID: 'a9cf08e170bb266ce050',
        clientSecret: 'da49f395279c072a596c16d4e735ce7619f27eab',
        callbackURL: "http://localhost:8080/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            const userResponse = await User.findOne({ idGitHub: profile.id });

            if (userResponse == null) {
                const user = {
                    idGitHub: profile.id,
                    firstName: profile.displayName.split(' ')[0],
                    lastName: profile.displayName.split(' ')[1]
                }

                await User.create(user);
            }

            done(null, profile)
        }
    )
)
