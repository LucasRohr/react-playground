import { useCallback } from 'react'
import { MainTitle } from '../../componentes/MainTitle'
import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'
import { useQuery } from '@tanstack/react-query'
import { getCategoryBySlug } from '../../http/get-category-by-slug'

const CategoryPage = () => {
    const routeParams = useParams()

    const { data: category, isLoading } = useQuery({
        queryKey: ['categoryBySlug', routeParams.slug],
        queryFn: () => getCategoryBySlug(routeParams.slug ?? ''),
    })

    const renderContent = useCallback(() => {
        if (isLoading) {
            return <Loader />
        }

        return (
            <section>
                <MainTitle title={category?.nome ?? 'Carregando...'} />
            </section>
        )
    }, [category, isLoading])

    return renderContent()
}

export { CategoryPage }
