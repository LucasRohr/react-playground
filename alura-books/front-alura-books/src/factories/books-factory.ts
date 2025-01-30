import { IBookApi } from '../interfaces/IBookApi'
import { IBook } from '../interfaces/IBook'
import { buyOptionsFactory } from './buy-options-factory'

export const bookFactory = (object: IBookApi): IBook | null => {
    if (!object) {
        return null
    }

    const {
        id,
        categoria,
        titulo,
        slug,
        descricao,
        isbn,
        numeroPaginas,
        publicacao,
        imagemCapa,
        autor,
        opcoesCompra,
        sobre,
    } = object

    return {
        id,
        category: categoria,
        title: titulo,
        slug,
        description: descricao,
        isbn,
        totalPages: numeroPaginas,
        publication: publicacao,
        coverImage: imagemCapa,
        writer: autor,
        buyOptions: opcoesCompra.map(buyOptionsFactory),
        about: sobre,
    }
}
