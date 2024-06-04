const { UserModel } = require("../database/db")

const getAllUsers = async (req, res) => {
    try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const getUserById = async (req, res) => {
    const id = Number(req.params.id)
    let user = await UserModel.findByPk(id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    res.status(200).json(user) 
}

const createUser = async (req, res) => {
    const user = await UserModel.create(req.body)
     res.status(201).json(user) 
}

const updateUser = async(req, res) => {
    const id = Number(req.params.id)
    let user = await UserModel.findByPk(id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    user.email = req.body.email
    user.password = req.body.password
    user.save()
    res.status(200).send(user)
}

const deleteUser = async (req, res) => {
    const id = Number(req.params.id)
    let user = await UserModel.findByPk(id)
    if (!user) {
       res.status(404).send('User not found')   
    }
    await user.destroy()
    res.status(204).send("User Deleted successfully")
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
    
}