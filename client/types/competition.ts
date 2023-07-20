import { IImages } from "./images"

export interface ICompetition {
   id: number
   name: string
   content: string
   status: string
   start: string
   meeting: string
   arrive: string
   images: IImages[]
   dateStart: string
   dateEnd: string
   createdAt: string
   place: string
   time: string
   palette: string
}