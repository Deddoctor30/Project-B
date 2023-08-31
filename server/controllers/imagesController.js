const uuid = require('uuid')
const path = require('path')
const {ItemImages} = require('../models/models')
const ApiError = require('../error/ApiError');

class ImagesController {
   async create (req, res, next) {
      try {
         const {id} = req.query
         const images = req.files?.images
         if (images) {
            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
                  ItemImages.create({
                     img: fileName,
                     userId: id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
               ItemImages.create({
                  img: fileName,
                  userId: id
               })
            }
         }
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
}

module.exports = new ImagesController()