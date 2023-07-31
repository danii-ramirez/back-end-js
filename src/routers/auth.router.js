const Router = require('express');
const User = require('../dao/models/modelUser')

const router = Router();

router.post('/register', (req, res) => {




    req.redirect('/login')
})

router.post('/login', (req, res) => {
    const user = {
        ...req.body
    }

    if (user.email.toLowerCase() == 'admincoder@code.com' && user.password == 'adminCod3r123') {
        req.session.firstname = 'admincoder@code.com';
        req.session.isAuthenticated = true;

        res.redirect('/products');
    } else {
        //validar en mongo
        res.send('not found');
    }
})

router.get('/logout', (req, res) => {

})

module.exports = router;
