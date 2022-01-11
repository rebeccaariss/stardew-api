const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('this is working');
})

app.post('/signin', (req, res) => {
    res.json('signed in');
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

// API Endpoint Plannning:
// / --> res = this is working (basic start response with res.send)
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// PUT request for updating saved NPCs
