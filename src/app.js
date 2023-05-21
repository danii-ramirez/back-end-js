const express = require('express')

const app = express()

app.get('/products', (req, res) => {
    let limit = req.query

    res.send('express')
})

app.get('/product/:pid', (req, res) => {
    let idProduct = req.params.pid

    res.send(idProduct)
})

app.listen(8080, () => {
    console.log('listening port 8080')
})
