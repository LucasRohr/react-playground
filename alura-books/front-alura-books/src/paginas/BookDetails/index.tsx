import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getBookBySlug } from '../../http/get-book-by-slug'
import { MainTitle } from '../../componentes/MainTitle'
import { useCallback } from 'react'
import { Loader } from '../../componentes/Loader'

const BookDetails = () => {
    const routeParams = useParams()

    const {
        data: bookDetails,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['get-book-by-slug', routeParams.slug],
        queryFn: () => getBookBySlug(routeParams.slug ?? ''),
    })

    const renderContent = useCallback(() => {
        if (isLoading) {
            return (
                <section className='book-details__loader'>
                    <Loader />
                </section>
            )
        }

        if (isError) {
            return (
                <section className='book-details__error'>
                    <h2>{error.message}</h2>
                </section>
            )
        }
    }, [isLoading, isError, error])

    return (
        <section className='book-details'>
            <MainTitle title='Detalhes do livro' />
            {renderContent()}
        </section>
    )
}

export { BookDetails }
