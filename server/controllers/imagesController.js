const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

const {Article, ItemImages} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError');
const { json } = require('sequelize');



class ImagesController {
   async create (req, res, next) {
      try {
         const {id} = req.query
         // создаем картинки
         const images = req.files?.images                                        // достаем картинку
         // const img = await ItemImages.create({name, content, userId: id})

         if (images) {
            if (Array.isArray(images)) {
               // images = JSON.parse(images)
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     userId: id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  userId: id
               })
            }
         }
         // return res.json(img)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   // async getAll (req, res) {
   //    let {limit, page} = req.query
   //    page = page || 1
   //    limit = limit || 30
   //    let offset = page * limit - limit

   //    const article = await Article.findAndCountAll({limit, offset, include: [{model: ItemImages, as: 'images'}]})
   //    return res.json(article)
   // }

   // async getAllAndCount (req, res) {
   //    const count = await Article.count()
   //    return res.json(count)
   // }

   // async getOne (req, res) {
   //    const {id} = req.params                                  // params это динамический id из роутов
   //    const article = await Article.findOne(
   //       {
   //          where: {id},
   //          include: [{model: ItemImages, as: 'images'}]
   //       }
   //    )
   //    return res.json(article)
   // }

   // async deleteAll (req, res) {
   //    const article = await Article.destroy({
   //       where: {}
   //    })
   //    return res.json(article)
   // }

   // async deleteOne (req, res) {
   //    // Удаление картинок с сервера
   //    const {id} = req.params
   //    const images = req.body.images
   //    if (images) {
   //       if (Array.isArray(images)) {
   //          images.forEach(item => {
   //             fs.unlink(path.resolve(__dirname, '..', 'static', 'img', item.img), err => {
   //                if (err) {
   //                   console.log(err);
   //                } else {
   //                   console.log(`Файл ${item.img} удален`)
   //                }
   //             })
   //          })
   //       }
   //    }

   //    const article = await Article.destroy({
   //       where: {id},
   //    })
   //    return res.json(article)
   // }
}

module.exports = new ImagesController()