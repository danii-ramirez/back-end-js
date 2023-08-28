const Router = require('express');

const router = Router();

router.get('/current', (req, res) => {
    const token = req.cookies['cookieJwt'];

    if (token) {
        res.send({ token });
    }
    else {
        res.send('not found');
    }
})

module.exports = router;
