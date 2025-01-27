import http from "."
import { IBook } from "../interfaces/ILivro"

export const getNewBooks = async () => {
    const response = await http.get<IBook[]>('public/lancamentos')

    return response.data
}
