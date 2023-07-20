const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

const {Article, ItemImages} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError');
const { json } = require('sequelize');


class ArticleController {
   async create (req, res, next) {
      try {
         let {name, content, swiper} = req.body
         const {id} = req.query
         // создаем картинки
         const images = req.files?.images                                        // достаем картинку
         const article = await Article.create({name, content, userId: id, swiper})
         

         if (images) {
            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     articleId: article.id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
               ItemImages.create({
                  img: fileName,
                  articleId: article.id
               })
            }
         }

         return res.json(article)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async update (req, res, next) {
      try {
         const images = req.files?.images

         const {name, content, id, swiper} = req.body
         await Article.update({name, content, swiper}, {where: {id}})

         if (images !== undefined) {
            const imagesItems = await ItemImages.findAll({where: {articleId: id}})
            imagesItems.forEach(item => {
               fs.unlink(path.resolve(__dirname, '..', 'static', 'img', item.img), err => {
                  if (err) {
                     console.log(err);
                  } else {
                     console.log(`Файл ${item.img} удален`)
                  }
               })
            })
            ItemImages.destroy({
               where: {articleId: id},
            })

            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     articleId: id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  articleId: id
               })
            }
         }
         
         const updatetArticle = await Article.findOne({
            where: {id},
            include: [{model: ItemImages, as: 'images'}]
         })
         return res.json(updatetArticle)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll (req, res) {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 30
      let offset = page * limit - limit

      const article = await Article.findAndCountAll({limit, offset, include: [{model: ItemImages, as: 'images'}]})
      return res.json(article)
   }

   async getAllAndCount (req, res) {
      const count = await Article.count()
      return res.json(count)
   }

   async getOne (req, res) {
      const {id} = req.params                                  // params это динамический id из роутов
      const article = await Article.findOne(
         {
            where: {id},
            include: [{model: ItemImages, as: 'images'}]
         }
      )
      return res.json(article)
   }

   async deleteAll (req, res) {
      const article = await Article.destroy({
         where: {}
      })
      return res.json(article)
   }

   async deleteOne (req, res) {
      // Удаление картинок с сервера
      const {id} = req.params
      const images = req.body.images
      if (images) {
         if (Array.isArray(images)) {
            images.forEach(item => {
               fs.unlink(path.resolve(__dirname, '..', 'static', 'img', item.img), err => {
                  if (err) {
                     console.log(err);
                  } else {
                     console.log(`Файл ${item.img} удален`)
                  }
               })
            })
         }
      }

      const article = await Article.destroy({
         where: {id},
      })
      return res.json(article)
   }
}

module.exports = new ArticleController()