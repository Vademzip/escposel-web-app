const Router = require('express')
const router = new Router()
const TournamentController = require('../controllers/TournamentController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.get('/get-all-tournaments', TournamentController.getAllTournaments)
router.get('/get-one-tournament/:id', TournamentController.getOneTournamentInfo)
router.post('/create', authMiddleware, checkAdminMiddleware, TournamentController.createTournament)
router.post('/add-team-to-tournament', authMiddleware, checkAdminMiddleware, TournamentController.addTeamToTournament)
router.patch('/update-tournament', authMiddleware, checkAdminMiddleware, TournamentController.updateTournamentInfo)


module.exports = router