import http from '.'
import { bookFactory } from '../factories/books-factory'
import { CategoryInterface } from '../interfaces'
import { IBookApi } from '../interfaces/IBookApi'
import { IBook } from '../interfaces/ILivro'

export const getCategoryBooks = async (category: CategoryInterface) => {
    const response = await http.get<IBookApi[]>('livros', {
        params: {
            categoria: category.id,
        },
    })

    const books: IBook[] = []

    response.data.forEach((responseBook) => {
        const parsedBook = bookFactory(responseBook)

        if (parsedBook) {
            books.push(parsedBook)
        }
    })

    return books
}
