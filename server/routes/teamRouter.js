const Router = require('express')
const router = new Router()
const Team = require('../controllers/TeamController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.post('/create', authMiddleware, checkAdminMiddleware, Team.createTeam)
router.patch('/add-game', authMiddleware, checkAdminMiddleware, Team.addGameToTeam)
router.patch('/change-game-amount', authMiddleware, checkAdminMiddleware, Team.changeGamesAmount)
router.patch('/change-wins-amount', authMiddleware, checkAdminMiddleware, Team.changeWinsAmount)
router.patch('/change-loses-amount', authMiddleware, checkAdminMiddleware, Team.changeLossesAmount)
router.get('/get-all-team-info', Team.getAllTeamInfo)
router.delete('/delete', authMiddleware, checkAdminMiddleware, Team.deleteOneTeam)
router.patch('/update', authMiddleware, checkAdminMiddleware, Team.editTeam)

module.exports = router