//poovarasan
const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {

            res.json({
                message: `post created..`, authData
            })
        }

    })
})

app.post('/api/login', (req, res) => {
    //sample mock user test
    const user = {
        id: 1,
        name: 'poo',
        email: 'poo@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({ token })
        // console.log(token);
        // res.send('token:', token)
    });
})
//format of token 
//Authorization:Bearer < access_token >

// verify Token 
function verifyToken(req, res, next) {
    // get header value
    const bearerHeader = req.headers['authorization']
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at space
        const bearer = bearerHeader.split(' ')
        // get token from array
        const bearerToken = bearer[1]
        // set token 
        req.token = bearerToken;
        //next middleware
        next()

    } else {
        // Forbidden client error
        res.sendStatus(403)
    }

}


app.listen(5050, () => {
    console.log('Server start on port 5050');
})


