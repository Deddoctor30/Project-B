const Router = require("express");
const router = new Router()
const imagesController = require('../controllers/imagesController')
const checkRole = require('../middleware/CheckRoleMiddleware')

// router.post('/', checkRole('ADMIN'), contactController.create)
router.post('/', imagesController.create)
// router.get('/', contactController.getAll)
// router.delete('/', checkRole('ADMIN'), contactController.deleteAll)
// router.delete('/:id', checkRole('ADMIN'), contactController.deleteOne)


module.exports = router