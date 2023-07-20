require('dotenv').config()          // чтобы читать конфиг env

const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')        // Запросы с браузера
const fileUpload = require('express-fileupload')
const router = require('./routes/index')     // импортируем роуты
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');
const cookieParser = require('cookie-parser');
const schedle = require('node-schedule')

const {Competition} = require('./models/models'); 
const { json } = require('sequelize');



const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())                                                      // Для взаимодействия сервера с браузером
app.use(express.json())                                              // Чтобы можно было парсить json (читать)
app.use(cookieParser())                                              // Чтобы юзать куки
app.use(express.static(path.resolve(__dirname, 'static')))           // позволяем серверу раздавать статику из папки через path
app.use(fileUpload({
   limits: { 
      fileSize: 1 * 1024 * 1024 * 1024 //1MB max file(s) size
   },
}))
app.use('/api', router)             // регистрируем роутер


// Т.к. это миделвеер ошибки (замыкающий), он регистрируется в самом конце, т.к. возвращает ответ
app.use(errorHandler)



const start = async () => {
   try {
      await sequelize.authenticate()                           // Подключение к базе данных
      await sequelize.sync()                                   // сверяет состояние бд со схемой бд      
      app.listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`))


      // Обновление БД
      schedle.scheduleJob('0 0 * * *', async () => {
         const competition = await Competition.findAll({raw: true})
         competition.map(item => {
            const dateNow = new Date();
            const dateStartEvent = new Date(item.dateStart)
            const dateEndEvent = new Date(item.dateEnd)
   
            if (dateNow.getTime() > dateStartEvent.getTime() && dateNow.getTime() <= dateEndEvent.getTime()) {
               Competition.update({status: 'Текущий'}, {where: {id: item.id}})
            }
            if (dateNow.getTime() > dateEndEvent.getTime()) {
               Competition.update({status: 'Прошедший'}, {where: {id: item.id}})
            }
            if (dateNow.getTime() < dateStartEvent.getTime()) {
               Competition.update({status: 'Будущий'}, {where: {id: item.id}})
            }
         })
         console.log('Ежедневное обновление базы данных по таблице соревнований');
      })
      
   } catch (e) {
      console.log(e);
   }
}

start();
