const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, ItemImages, UserAchievements} = require('../models/models')

const uuid = require('uuid')
const path = require('path')
const fs = require('fs');




const generateJwt = (id, name, email, role) => {
   return jwt.sign({id, name, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}


class UserController {
   async registration (req, res, next) {
      const {email, name, password, role} = req.body

      // Переделать на нормальную валидация
      if (!email || !password) {
         return next(ApiError.badRequest('Некорректный email или password'))
      }
      const candidate = await User.findOne({where: {email}})
      
      if (candidate) {
         return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({name, email, role, password: hashPassword})
      const token = generateJwt(user.id, user.name, user.email, user.role)
      return res.json({token})
   }

   async login (req, res, next) {
      const {email, password} = req.body
      const user =  await User.findOne({where: {email}})
      if (!user) {
         return next(ApiError.internal('Пользователь с таким email не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
         return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id, user.name, user.email, user.role)
      return res.json({token})
   }

   async check (req, res, next) {
      const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role)
      return res.json({token})
   }

   async getAll (req, res) {
      const user = await User.findAll()
      return res.json(user)
   }

   async getOne (req, res) {
      const {id} = req.params
      const user = await User.findOne(
         {
            where: {id},
            include: [
               {model: ItemImages, as: 'images'},
               {model: UserAchievements, as: 'achievements'}
            ]
         }
      )
      return res.json(user)
   }

   async deleteOne (req, res) {
      const {id} = req.params
      const images = req.body?.images
      const isGalery = req.body?.isGalery
      const achievementsId = req.body?.achievements

      if (images) {
         fs.unlink(path.resolve(__dirname, '..', 'static', 'img', images), err => {
            if (err) {
               console.log(err);
            } else {
               console.log(`Файл ${images} удален`)
            }
         })
         // const user = await User.
         ItemImages.destroy({
            where: {img: images}
         })
      }

      if (!isGalery) {
         const user = await User.destroy({
            where: {id}
         })
         return res.json(user)
      }

      if (achievementsId !== undefined) {
         console.log('сработало');
         const userAchievementsId = UserAchievements.destroy({
            where: {id: achievementsId}
         })
         console.log(`Достижение с ID ${achievementsId} удалено`);
         return res.json(userAchievementsId)
      }

   }

   
   async uploadData (req, res, next) {
      try {
         const {id} = req.params
         const images = req.files?.images  
         const avatar = req.files?.avatar   
         const currentAvatar = req.body?.currentAvatar                                   // достаем картинку
         const achievements = req.body?.data?.achievements

         // console.log(achievements);

         if (images) {
            if (Array.isArray(images)) {
               let arr = []
               images.forEach(item => {
                  let fileName = uuid.v4() + ".jpg"                                                  // создаем уникальное имя
                  item.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
                  ItemImages.create({
                     img: fileName,
                     userId: id
                  })
                  arr.push({id: uuid.v4(), img: fileName, userId: id})
               });
               return res.json(arr)
            } else {
               let arr = []
               let fileName = uuid.v4() + ".jpg"       
               images.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))      // перемещаем в папку static
               ItemImages.create({
                  img: fileName,
                  userId: id
               })
               arr.push({id: uuid.v4(), img: fileName, userId: id})
               return res.json(arr)
            }
         }

         if (avatar) {
            // Удаление картинки из статики и таблицы по currentAvatar из бади
            if (currentAvatar) {
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
            }
            // Создание новой картинки
            let fileName = uuid.v4() + ".jpg"
            avatar.mv(path.resolve(__dirname, '..', 'static', 'img', fileName))
            ItemImages.create({
               img: fileName,
               userId: id
            })
            User.update({avatar: fileName}, {where: {id}})
            return res.json(fileName)
         }

         if (achievements) {
            const userAchievements = await UserAchievements.create({content: achievements, userId: id})
            return res.json(userAchievements)
         }

      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async updateOne (req, res) {
      const coach = req.body?.coach
      const userId = req.body?.id
      const role = req.body?.role   
      const id = req.params?.id
      
      let user;
      if (coach) {
         user = await User.update({coach}, {where: {id}})
      }
      if (userId) {
         user = await User.update({role}, {where: {id: userId}})
      }
      return res.json(user)
   }

   async updateRole (req, res) {
      const id = req.body?.data?.id
      const role = req.body?.data?.role
      console.log(role);
      let user;
      if (role) {
         user = await User.update({role}, {where: {id}})
      }
      return res.json(user)
   }
}

module.exports = new UserController()