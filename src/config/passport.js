const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const initializatePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'mysecrect'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(null, error)
        }
    }))
}

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['cookieJwt']
    }
    return token;
}

const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ message: 'unauthorized' })
        if (req.user.role != role) res.status(403).send({ message: 'no permissions' })
        next()
    }
}

module.exports = { initializatePassport, authorization };
