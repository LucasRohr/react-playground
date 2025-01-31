import http from '.'
import { bookFactory } from '../factories/books-factory'
import { IBookApi } from '../interfaces/IBookApi'

export const getBookBySlug = async (slug: string) => {
    const response = await http.get<IBookApi[]>('livros', {
        params: {
            slug,
        },
    })

    const parsedBook = bookFactory(response.data[0])

    return parsedBook
}
