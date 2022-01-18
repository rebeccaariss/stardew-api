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
            characterIds: [],
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    // res.send('this is working');
    res.send(database.users);
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
    const { name, email, password } = req.body;
    if (name && email && password) {
        database.users.push({
            id: '2',
            name: name,
            email: email,
            password: password,
            savedCharacters: 0,
            characterIds: [],
            joined: new Date()
        }); 
        res.json(database.users[database.users.length-1]);
    } else {
        res.status(400).json('failed to register new user');
    }
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('could not locate user');
    }
    // res.json('on user profile');
})

app.put('/list', (req, res) => {
    // remember req.body as opposed to req.params:
    const { id, npcId } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            let onList = false;
            for (let i = 0; i < user.characterIds.length; i++) {
                if (user.characterIds[i] === npcId) {
                    onList = true;
                }
            }
            if (onList === false) {
                user.savedCharacters++;
                user.characterIds.push(npcId);
                onList = true;
                return res.json(user);
            } else {
                res.json("this NPC was already on your list!")
            }
        }
    })
    if (!found) {
        res.status(404).json("could not locate user data")
    }
})

app.delete('/list', (req, res) => {
    const { id, npcId } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            let onList = false;
            for (let i = 0; i < user.characterIds.length; i++) {
                if (user.characterIds[i] === npcId) {
                    user.savedCharacters--;
                    user.characterIds.splice(i, 1);
                    onList = false;
                } else {
                    res.status(404).json("this NPC wasn't on your list!")
                }
            }
            return res.json(user);
            // need to debug re: attempts to delete the same NPC twice
        }
    })
    if (!found) {
        res.status(404).json("could not locate user data")
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

// API Endpoint Plannning:
// / --> res = this is working (basic start response with res.send)
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:id --> GET = user
// PUT request for updating saved NPCs
// DELETE for removing NPCs from saved list
