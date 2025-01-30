import { IAuthor } from '../interfaces/IAuthor'
import { IAuthorApi } from '../interfaces/IAuthorApi'

export const authorFactory = (object: IAuthorApi): IAuthor | null => {
    if (!object) {
        return null
    }

    const { id, nome, sobre } = object

    return {
        id,
        name: nome,
        about: sobre,
    }
}
