const Router = require("express");
const router = new Router()
const clinicalController = require('../controllers/clinicalController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), clinicalController.create)
router.put('/', checkRole('ADMIN'), clinicalController.update)
router.get('/', clinicalController.getAll)
router.delete('/', checkRole('ADMIN'), clinicalController.deleteAll)
router.delete('/:id', checkRole('ADMIN'), clinicalController.deleteOne)


module.exports = router