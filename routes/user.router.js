const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const {ensureAuthenticated}  = require('../config/auth')

router.post('/register',UserController.register_user)
router.post('/login',UserController.login_user)
router.get('/logout',UserController.logout_user)
router.get('/logged-user', UserController.get_logged_user)

router.get('/', UserController.get_all_users)
router.get('/user/:id', UserController.get_user)
router.delete('/delete/:id',UserController.delete_user)
router.post('/update/:id', UserController.update_user)
router.post('/state/:id',UserController.change_active_user)

module.exports = router 