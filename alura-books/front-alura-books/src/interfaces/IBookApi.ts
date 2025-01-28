import { IBuyOptionApi } from "./IBuyOptionApi"

export interface IBookApi {
    id: number
    categoria: number
    titulo: string
    slug: string
    descricao: string
    isbn: string
    numeroPaginas: number
    publicacao: string
    imagemCapa: string
    autor: number
    opcoesCompra: IBuyOptionApi[]
    sobre: string
}