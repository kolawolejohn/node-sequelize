
let users = []
const getAllUsers = (req, res) => {
    res.status(200).json(users)
}

const getUserById = (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id == id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    res.status(200).json(user) 
}

const createUser = (req, res) => {
    const user = req.body
    user.id = Date.now()
    users.push(user)
    res.status(201).json(user) 
}

const updateUser = (req, res) => {
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
}

const deleteUser = (req, res) => {
    const id = Number(req.params.id)
    users = users.filter((u) => u.id !== id)
    res.status(204).send("") 
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
    
}