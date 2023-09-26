const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.get('/get-user-image/:id', authMiddleware, UserController.getUserImage)

module.exports = router