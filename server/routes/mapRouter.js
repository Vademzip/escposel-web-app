const {Router} = require('express')
const router = new Router()
const MapController = require('../controllers/MapController')
const authMiddleware = require("../middlewares/auth-middleware");
const checkAdminMiddleware = require("../middlewares/check-admin-middleware");

router.get('/get-all-maps', MapController.getAllMaps )
router.post('/create', authMiddleware, checkAdminMiddleware, MapController.createMap )
router.patch('/update', authMiddleware, checkAdminMiddleware, MapController.updateMap )

module.exports = router
