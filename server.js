const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// "database" for initial endpoint tests:
const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            savedCharacters: 0,
            characterNames: [],
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working');
})

//note that res.json is a method that comes with express and will return a message in quotations as opposed to res.send which does not. visual distinction.
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('signed in');
    } else {
        res.status(400).json('could not sign in');
    }
})

app.post('/register', (req, res) => {
    res.json('registered');
})

app.get('/profile/:userId', (req, res) => {
    res.json('on user profile');
})

app.put('/list/:npcId', (req, res) => {
    res.json('added NPC to list');
})

app.delete('/list/:npcId', (req, res) => {
    res.json('removed NPC from list');
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

// API Endpoint Plannning:
// / --> res = this is working (basic start response with res.send)
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// PUT request for updating saved NPCs
// DELETE for removing NPCs from saved list
