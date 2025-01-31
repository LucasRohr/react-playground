import http from '.'
import { authorFactory } from '../factories/author-factory'
import { IAuthorApi } from '../interfaces/IAuthorApi'

export const getAuthorById = async (id: number) => {
    const response = await http.get<IAuthorApi[]>('autores', {
        params: {
            id,
        },
    })

    const parsedAuthor = authorFactory(response.data[0])

    return parsedAuthor
}
