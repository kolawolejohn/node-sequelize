const router = require('express').Router()
const authorization = require('../middlewares/authorization.middleware')
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controller')

router.get('/', authorization, getAllUsers)

router.get('/:id', authorization,  getUserById)

router.post('/', createUser)

router.put('/:id', updateUser )

router.delete('/:id', deleteUser )

module.exports = router