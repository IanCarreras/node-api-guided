const express = require('express')
let db = require('./database')
// create instance of express app
const app = express()

//use middleware to parse req body if json
app.use(express.json())

const port = 8080
const host = '127.0.0.1'

app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`)
})

app.get('/', (req, res) => {
    console.log('ip:', req.ip)

    res.json(db)
})

app.get('/lambda', (req, res) => {
    res.redirect('https://lambdaschool.com')
})

app.get('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})

app.post('/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Users need to have a name'})
    }

    const newUser = {
        id: String(db.length+1),
        name: req.body.name
    }

    db.push(newUser)
    res.status(201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
    const user = db.find(row => row.id === req.params.id)

    if (user) {
        db = db.filter(row => row.id !== req.params.id)
        res.json(user)
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})

// const http = require('http')

// const server = http.createServer((req, res) => {
//     //log user's ip address
//     console.log('ip:', req.connection.remoteAddress)

//     //build response
//     res.statusCode = 200
//     res.setHeader('content-type', 'text/html')
//     res.write('<html><body><h1>Working!!!</h1></body></html>')
    
//     //response is ready, send
//     res.end()
// })