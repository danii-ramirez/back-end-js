const Router = require('express');
const User = require('../dao/models/modelUser');
const passport = require('passport');
const jwt = require('jsonwebtoken')

const router = Router();

router.post('/register', async (req, res) => {
    const user = {
        ...req.body
    }

    try {
        const response = await User.create(user);

        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.send('faild');
    }
})

router.post('/login', async (req, res) => {
    const user = {
        ...req.body
    }

    if (user.email.toLowerCase() == 'admincoder@code.com' && user.password == 'adminCod3r123') {
        req.session.firstName = 'admincoder@code.com';
        req.session.rol = 'admin';
        req.session.isAuthenticated = true;

        let token = jwt.sign(userResponse, 'mysecrect', { expiresIn: 60 });
        req.headers.authorization = 'bearen ' + token; w

        res.redirect('/products');
    } else {
        try {
            const userResponse = await User.findOne({ email: user.email, password: user.password });

            if (userResponse == null) {
                res.redirect('/login')
            } else {
                req.session.firstName = userResponse.firstName;
                req.session.rol = 'user';
                req.session.isAuthenticated = true;

                let token = jwt.sign(JSON.parse(JSON.stringify(userResponse)), 'mysecrect', { expiresIn: 60 });
                // req.headers.authorization = 'bearen ' + token;
                console.log(token)
                // res.header.authorization = 'bearen ' + token;
                res.redirect('/products');
            }
        } catch (error) {
            console.log(error);
            res.send('faild');
        }
    }
})

router.get('/github', passport.authenticate('auth-github', { scope: ['user:email'], session: false }))

router.get('/github/callback', passport.authenticate('auth-github', { scope: ['user:email'], session: false }), (req, res) => {
    req.session.firstName = req.user.displayName;
    req.session.rol = 'user';
    req.session.isAuthenticated = true;

    res.redirect('/products');
})

module.exports = router;
