const Router = require("express");
const router = new Router()
const contactController = require('../controllers/contactController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), contactController.create)
router.put('/', checkRole('ADMIN'), contactController.update)
router.get('/', contactController.getAll)
router.delete('/', checkRole('ADMIN'), contactController.deleteAll)
router.delete('/:id', checkRole('ADMIN'), contactController.deleteOne)


module.exports = router