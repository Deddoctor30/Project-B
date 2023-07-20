const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

const {Coach, ItemImages} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError')


class CoachController {
   async create (req, res, next) {
      try {
         const {name, content, position, weapon, teachSince, category, education, contact} = req.body
         // const {id} = req.query
         // создаем картинки
         const images = req.files?.images
         const avatar = req.files?.avatar

         const coach = await Coach.create({name, content, position, weapon, teachSince, category, education, contact})

         if (images) {
            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
                  ItemImages.create({
                     img: fileName,
                     coachId: coach.id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
               ItemImages.create({
                  img: fileName,
                  coachId: coach.id
               })
            }
         }

         if (avatar) {
            if (Array.isArray(avatar)) {
               avatar.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
                  ItemImages.create({
                     img: fileName,
                     coachId: coach.id
                  })
                  Coach.update({avatar: fileName}, {where: {id: coach.id}})
               });
            } else {
               let fileName = uuid.v4() + ".jpg"
               avatar.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
               ItemImages.create({
                  img: fileName,
                  coachId: coach.id
               })
               Coach.update({avatar: fileName}, {where: {id: coach.id}})
            }
         }
        
         return res.json(coach)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
   
   async update (req, res, next) {
      try {
         const images = req.files?.images
         const avatar = req.files?.avatar
         const {name, content, position, weapon, teachSince, category, education, contact, id} = req.body
         const currentAvatar = req.body?.currentAvatar

         // console.log(currentAvatar);

         await Coach.update({name, content, position, weapon, teachSince, category, education, contact}, {where: {id}})

         if (images !== undefined) {
            const imagesItems = await ItemImages.findAll({where: {coachId: id}})
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
               where: {coachId: id},
            })

            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     coachId: id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  coachId: id
               })
            }
         }

         if (avatar) {
            if (Array.isArray(avatar)) {
               fs.unlink(path.resolve(__dirname, '..', 'static', 'img', currentAvatar), err => {
                  if (err) {
                     console.log(err);
                  } else {
                     console.log(`Файл ${currentAvatar} удален`)
                  }
               })
               ItemImages.destroy({
                  where: {img: currentAvatar}
               })

               avatar.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
                  ItemImages.create({
                     img: fileName,
                     coachId: id
                  })
                  Coach.update({avatar: fileName}, {where: {id}})
               });
            } else {
               let fileName = uuid.v4() + ".jpg"
               avatar.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
               ItemImages.create({
                  img: fileName,
                  coachId: id
               })
               Coach.update({avatar: fileName}, {where: {id}})
            }
         }

         const updatetCoach = await Coach.findOne({
            where: {id},
            include: [{model: ItemImages, as: 'images'}]
         })
         return res.json(updatetCoach)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll (req, res) {
      const coach = await Coach.findAll({include: [{model: ItemImages, as: 'images'}]})
      return res.json(coach)
   }
   async getOne (req, res) {

      const {id} = req.params
      const coach = await Coach.findOne(
         {
            where: {id},
            include: [{model: ItemImages, as: 'images'}]
         }
      )
      return res.json(coach)
   }
   
   async deleteAll (req, res) {
      const coach = await Coach.destroy({
         where: {}
      })
      return res.json(coach)
   }

   async deleteOne (req, res) {
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

      const coach = await Coach.destroy({
         where: {id}
      })
      return res.json(coach)
   }
}

module.exports = new CoachController()