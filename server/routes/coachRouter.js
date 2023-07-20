const Router = require("express");
const router = new Router()
const coachController = require('../controllers/coachController')
const checkRole = require('../middleware/CheckRoleMiddleware')

// router.post('/', checkRole('ADMIN'), coachController.create)
router.post('/', checkRole('ADMIN'), coachController.create)
router.put('/', checkRole('ADMIN'), coachController.update)
router.get('/', coachController.getAll)
router.get('/:id', coachController.getOne)
router.delete('/', checkRole('ADMIN'), coachController.deleteAll)
router.delete('/:id', checkRole('ADMIN'), coachController.deleteOne)

module.exports = router