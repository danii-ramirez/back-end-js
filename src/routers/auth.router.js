const Router = require('express');
const User = require('../dao/models/modelUser');
const passport = require('passport');

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

        res.redirect('/products');
    } else {
        try {
            const userResponse = await User.findOne({ email: user.email, password: user.password });

            if (userResponse == null) {
                res.redirect('/login')
            } else {
                console.log(userResponse.firstName)

                req.session.firstName = userResponse.firstName;
                req.session.rol = 'user';
                req.session.isAuthenticated = true;

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
    res.send(req.user)
})

module.exports = router;
