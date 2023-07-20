import { IImages } from "./images"

export interface ICoach {
   id: number
   name: string
   content: string
   images: IImages[]
   createdAt: string
   position: string
   weapon: string
   teachSince: string
   category: string
   education: string
   contact: string
   avatar: string
}