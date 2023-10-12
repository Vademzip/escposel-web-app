const Router = require('express')
const router = new Router()
const PlayerController = require('../controllers/PlayerController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.post('/create', authMiddleware, checkAdminMiddleware, PlayerController.createPlayer)
router.get('/get-all-players', PlayerController.getAllPlayers)
  router.get('/get-player-info/:id', PlayerController.getOnePlayerInfo)
router.delete('/delete', authMiddleware, checkAdminMiddleware, PlayerController.deleteOnePlayer)
router.put('/update', authMiddleware, checkAdminMiddleware, PlayerController.editPlayer)

module.exports = router