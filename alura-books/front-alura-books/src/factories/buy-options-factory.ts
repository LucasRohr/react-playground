import { IBuyOption } from '../interfaces/IBuyOption'
import { IBuyOptionApi } from '../interfaces/IBuyOptionApi'

export const buyOptionsFactory = (object: IBuyOptionApi): IBuyOption => {
    const { id, preco, titulo, formatos } = object

    return {
        id,
        price: preco,
        title: titulo,
        formats: formatos,
    }
}
