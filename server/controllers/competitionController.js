const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const schedle = require('node-schedule')

const {Competition, ItemImages} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError')

class CompetitionController {

   async create (req, res, next) {
      try {
         const {name, content, dateStart, dateEnd, start, meeting, arrive, place, time, palette} = req.body
         const {id} = req.query
         
         // Описание событий
         let status = 'Будущий';
         const dateNow = new Date();
         const dateStartEvent = new Date(dateStart)
         const dateEndEvent = new Date(dateEnd)

         console.log(`Время: ${time}`);

         if (dateNow.getTime() > dateStartEvent.getTime() && dateNow.getTime() <= dateEndEvent.getTime()) {
            status = 'Текущий'
         }
         if (dateNow.getTime() > dateEndEvent.getTime()) {
            status = 'Прошедший'
         }


         // создаем картинки
         const images = req.files?.images                                        // достаем картинку
         const competition = await Competition.create({name, content, userId: id, status, dateStart, dateEnd, start, meeting, arrive, place, time, palette})
         
         if (images) {
            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     competitionId: competition.id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  competitionId: competition.id
               })
            }
         }
         return res.json(competition)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
   
   async update (req, res, next) {
      try {
         const images = req.files?.images
         const name = req?.body?.name
         const content = req?.body?.content
         const dateStart = req?.body?.dateStart
         const dateEnd = req?.body?.dateEnd
         const start = req?.body?.start
         const meeting = req?.body?.meeting
         const arrive = req?.body?.arrive
         const place = req?.body?.place
         const time = req?.body?.time
         const id = req?.body?.id
         const palette = req?.body?.palette
         
         await Competition.update({name, content, dateStart, dateEnd, start, meeting, arrive, place, time, palette}, {where: {id}})

         console.log(id);

         if (images !== undefined) {
            const imagesItems = await ItemImages.findAll({where: {competitionId: id}})
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
               where: {competitionId: id},
            })

            if (Array.isArray(images)) {
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     competitionId: id
                  })
               });
            } else {
               let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  competitionId: id
               })
            }
         }

         const updatetCompetition = await Competition.findOne({
            where: {id},
            include: [{model: ItemImages, as: 'images'}]
         })
         return res.json(updatetCompetition)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll (req, res) {
      // let {limit, page} = req.query
      // page = page || 1
      // limit = limit || 8
      // let offset = page * limit - limit

      // const competition = await Competition.findAndCountAll({limit, offset, include: [{model: ItemImages, as: 'images'}]})
      const competition = await Competition.findAndCountAll({include: [{model: ItemImages, as: 'images'}]})
      return res.json(competition)
   }

   async getOne (req, res) {
      const {id} = req.params                                  // params это динамический id из роутов
      const competition = await Competition.findOne(
         {
            where: {id}
         }
      )
      return res.json(competition)
   }

   async deleteAll (req, res) {
      const competition = await Competition.destroy({
         where: {}
      })
      return res.json(competition)
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

      const competition = await Competition.destroy({
         where: {id}
      })
      return res.json(competition)
   }
}

module.exports = new CompetitionController()