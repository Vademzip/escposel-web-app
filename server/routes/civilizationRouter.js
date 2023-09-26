const Router = require('express')
const router = new Router()
const CivilizationController = require('../controllers/CivilizationController')
const Team = require("../controllers/TeamController");
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.post('/create', authMiddleware, checkAdminMiddleware, CivilizationController.addCivilization)
router.get('/get-all-civs', CivilizationController.getAllCivilizations)
router.get('/get-all-civs-by-wins', CivilizationController.getAllCivilizationsSortByWinRate)
router.delete('/delete', authMiddleware, checkAdminMiddleware, CivilizationController.deleteOneCivilization)
router.patch('/update', authMiddleware, checkAdminMiddleware, CivilizationController.editCivilization)

module.exports = router