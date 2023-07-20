const {Contact} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError')

class ContactController {
   async create (req, res, next) {
      try {
         const {name, email, phoneNumber} = req.body
         const contact = await Contact.create({name, email, phoneNumber})
         return res.json(contact)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
   
   async update (req, res, next) {
      try {
         let {name, email, phoneNumber, id} = req.body
         await Contact.update({name, email, phoneNumber}, {where: {id}})

         const updatetContact = await Contact.findOne({
            where: {id},
         })
         return res.json(updatetContact)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll (req, res) {
      const contact = await Contact.findAll()
      return res.json(contact)
   }
   
   async deleteAll (req, res) {
      const contact = await Contact.destroy({
         where: {}
      })
      return res.json(contact)
   }

   async deleteOne (req, res) {
      const {id} = req.params
      const contact = await Contact.destroy({
         where: {id}
      })
      
      return res.json(contact)
   }
}

module.exports = new ContactController()