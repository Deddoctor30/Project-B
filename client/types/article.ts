import { IImages } from "./images"

export interface IArticle {
   id: number
   name: string
   content: string
   images: IImages[]
   createdAt: string
   swiper: boolean
}