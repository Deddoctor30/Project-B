const Router = require("express");
const router = new Router()
const competitionController = require('../controllers/competitionController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), competitionController.create)
router.put('/', checkRole('ADMIN'), competitionController.update)
router.get('/', competitionController.getAll)
router.get('/:id', competitionController.getOne)
router.delete('/', checkRole('ADMIN'), competitionController.deleteAll)
router.delete('/:id', checkRole('ADMIN'), competitionController.deleteOne)


module.exports = router