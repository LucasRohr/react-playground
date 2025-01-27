import { IBuyOption } from "./IBuyOption"

export interface IBook {
    id: number
    category: number
    title: string
    slug: string
    description: string
    isbn: string
    totalPages: number
    publication: string
    coverImage: string
    writer: number
    buyOptions: IBuyOption[]
    about: string
}
