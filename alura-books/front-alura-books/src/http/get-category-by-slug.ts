import http from "."
import { CategoryInterface } from "../interfaces"

export const getCategoryBySlug = async (slug: string) => {
    const response = await http.get<CategoryInterface[]>('categorias', {
        params: {
            slug,
        },
    })

    return response.data[0]
}
