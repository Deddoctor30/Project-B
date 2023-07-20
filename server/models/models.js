const sequelize = require('../db')                 // импортируем сиквалайз
const {DataTypes} = require('sequelize')           // чтобы можно было указывать типы данных

const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   email: {type: DataTypes.STRING, unique: true},
   password: {type: DataTypes.STRING},
   role: {type: DataTypes.STRING, defaultValue: "USER"},
   coach: {type: DataTypes.STRING},
   avatar: {type: DataTypes.STRING},
   // achievements: {type: DataTypes.TEXT},
})

const Article = sequelize.define('article', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   content: {type: DataTypes.TEXT},
   swiper: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const ItemImages = sequelize.define('itemimages', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   img: {type: DataTypes.STRING, allowNull: false}
})


const Competition = sequelize.define('competition', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   content: {type: DataTypes.TEXT},
   status: {type: DataTypes.STRING},
   start: {type: DataTypes.STRING},
   meeting: {type: DataTypes.STRING},
   arrive: {type: DataTypes.STRING},
   dateStart: {type: DataTypes.DATE},
   dateEnd: {type: DataTypes.DATE},
   place: {type: DataTypes.STRING},
   time: {type: DataTypes.DATE},
   palette: {type: DataTypes.STRING}
})


const Coach = sequelize.define('coach', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   content: {type: DataTypes.TEXT},
   position: {type: DataTypes.STRING},
   weapon: {type: DataTypes.STRING},
   teachSince: {type: DataTypes.STRING},
   category: {type: DataTypes.STRING},
   education: {type: DataTypes.STRING},
   contact: {type: DataTypes.STRING},
   avatar: {type: DataTypes.STRING}
}) 

const Clinical = sequelize.define('clinical', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   status: {type: DataTypes.BOOLEAN},
}) 

const Contact = sequelize.define('contact', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},        // описываем поля для модели
   name: {type: DataTypes.STRING},
   email: {type: DataTypes.STRING, unique: true},
   phoneNumber: {type: DataTypes.STRING, unique: true},
}) 

const UserAchievements = sequelize.define('userAchievements', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   content: {type: DataTypes.TEXT},
})


// Images
Article.hasMany(ItemImages, {as: 'images'})
ItemImages.belongsTo(Article)

Competition.hasMany(ItemImages, {as: 'images'})
ItemImages.belongsTo(Competition)

Coach.hasMany(ItemImages, {as: 'images'})
ItemImages.belongsTo(Coach)


// UserID
User.hasMany(Article, {as: 'articles'})
Article.belongsTo(User)

User.hasMany(Competition, {as: 'competitions'})
Competition.belongsTo(User)

User.hasMany(ItemImages, {as: 'images'})
ItemImages.belongsTo(User)


// UserAchievements
User.hasMany(UserAchievements, {as: 'achievements'})
UserAchievements.belongsTo(User)


module.exports = {
   User,
   Article,
   Competition,
   Coach,
   Clinical,
   Contact,
   ItemImages,
   UserAchievements
}
