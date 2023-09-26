const Router = require('express')
const router = new Router()
const GameController = require('../controllers/GameController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.post('/create', authMiddleware, checkAdminMiddleware, GameController.createGame)
router.get('/get-all-games-info', GameController.getFullGamesInfo)
router.get('/get-one-game/:id', GameController.getOneGame)
router.get('/get-one-tournament-games/:id', GameController.getOneTournamentGames)
router.get('/get-one-team-games/:id', GameController.getAllTeamGames)
router.patch('/update', authMiddleware, checkAdminMiddleware, GameController.updateOneGame)
router.delete('/delete', authMiddleware, checkAdminMiddleware, GameController.deleteOneGame)

module.exports = router
