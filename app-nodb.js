const express = require('express')
const app = express()

app.use(express.json())

let users = []

app.get('/', (req, res) => {
    res.status(200).json(users)
})

app.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id == id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    res.status(200).json(user) 
})

app.post('/', (req, res) => {
    const user = req.body
    user.id = Date.now()
    users.push(user)
    res.status(201).json(user) 
})

app.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    let user = users.find(u => u.id == id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    users = users.filter((u) => u.id !== id)
    user = req.body
    user.id = id
    users.push(user)
    res.status(201).json(user) 
})

app.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    users = users.filter((u) => u.id !== id)
    res.status(204).send("") 
})

app.listen(3900, () => {
  console.log(`app running on port: 3900`)
})