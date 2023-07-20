const Router = require("express");
const router = new Router()
const userController = require('../controllers/userContrloller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/:id', userController.uploadData)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.delete('/:id', userController.deleteOne)
router.put('/:id', userController.updateOne)
router.put('/', userController.updateRole)



module.exports = router