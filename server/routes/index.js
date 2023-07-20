const Router = require("express");
const router = new Router()

const articleRouter = require('./articleRouter')
const clinicalRouter = require('./clinicalRouter')
const coachRouter = require('./coachRouter')
const competitionRouter = require('./competitionRouter')
const contactRouter = require('./contactRouter')
const userRouter = require('./userRouter')
// const imagesRouter = require('./imagesRouter')

router.use('/article', articleRouter)
router.use('/clinical', clinicalRouter)
router.use('/coach', coachRouter)
router.use('/competition', competitionRouter)
router.use('/contact', contactRouter)
router.use('/user', userRouter)
// router.use('/user/images', imagesRouter)

module.exports = router