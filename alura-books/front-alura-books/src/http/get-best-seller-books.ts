import http from "."
import { IBook } from "../interfaces/ILivro"

export const getBestSellerBooks = async () => {
    const response = await http.get<IBook[]>('livros/mais-vendidos')

    return response.data
}
