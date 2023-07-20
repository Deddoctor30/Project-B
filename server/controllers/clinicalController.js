const {Clinical} = require('../models/models')            // импортируем модель (работа с БД)
const ApiError = require('../error/ApiError')


class ClinicalController {
   async create (req, res, next) {
      try {
         const {name, status} = req.body
         const clinical = await Clinical.create({name, status})
         return res.json(clinical)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async update (req, res, next) {
      try {
         let {name, status, id} = req.body

         console.log(name);
         console.log(id);
         
         await Clinical.update({name, status}, {where: {id}})

         const updatetClinical = await Clinical.findOne({
            where: {id},
         })
         return res.json(updatetClinical)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll (req, res) {
      const clinical = await Clinical.findAll()
      return res.json(clinical)
   }
   
   async deleteAll (req, res) {
      const clinical = await Clinical.destroy({
         where: {}
      })
      return res.json(clinical)
   }

   async deleteOne (req, res) {
      const {id} = req.params
      
      const clinical = await Clinical.destroy({
         where: {id}
      })
      return res.json(clinical)
   }
}

module.exports = new ClinicalController()