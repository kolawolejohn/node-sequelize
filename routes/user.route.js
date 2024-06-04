const router = require('express').Router()
const auth = require('../middlewares/auth.middlewre')
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controller')

router.get('/', auth, getAllUsers)

router.get('/:id', auth, getUserById)

router.post('/', createUser)

router.put('/:id', auth, updateUser )

router.delete('/:id', auth, deleteUser )

module.exports = router