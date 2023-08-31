const Router = require("express");
const router = new Router()
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), articleController.create)
router.put('/', checkRole('ADMIN'), articleController.update)
router.delete('/', checkRole('ADMIN'), articleController.deleteAll)
router.delete('/:id', checkRole('ADMIN'), articleController.deleteOne)
router.get('/', articleController.getAll)
router.get('/arr', articleController.getAllAndCount)
router.get('/:id', articleController.getOne)



module.exports = router