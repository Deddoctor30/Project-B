import { IAchievements } from "./achievements"
import { IImages } from "./images"


export interface IUser {
   id: number
   name: string
   email: string
   password: string
   role: string
   createdAt: string
   coach: string
   achievements: IAchievements[]
   avatar: string
   images: IImages[]
}