const Router = require('express')
const userController = require('../controllers/UserController')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const checkAdminMiddleware = require('../middlewares/check-admin-middleware')
const router     = new Router()
const TeamRouter = require('./teamRouter')
const PlayerRouter = require('./playerRouter')
const CivilizationRouter = require('./civilizationRouter')
const UserRouter = require('./userRouter')
const GameRouter = require('./gameRouter')
const MapRouter = require('./mapRouter')
const TournamentRouter = require('./tournamentRouter')

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activation/:link', userController.activate)
router.get('/refresh', userController.refreshToken)
router.get('/users', authMiddleware, userController.getAllUsers)
router.use('/user', UserRouter)
router.use('/team', TeamRouter)
router.use('/player', PlayerRouter)
router.use('/civilization', CivilizationRouter)
router.use('/game', GameRouter)
router.use('/tournament', TournamentRouter)
router.use('/map', MapRouter)


module.exports = router