import http from "."
import { IBook } from "../interfaces/ILivro"

export const getBestSellerBooks = async () => {
    const response = await http.get<IBook[]>('public/mais-vendidos')

    return response.data
}
