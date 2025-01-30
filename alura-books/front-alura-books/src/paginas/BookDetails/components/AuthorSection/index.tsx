import { useQuery } from '@tanstack/react-query'
import { AuthorSectionProps } from './types'
import { getAuthorById } from '../../../../http/get-author-by-id'
import { useCallback } from 'react'
import { Loader } from '../../../../componentes/Loader'

const AuthorSection = (props: AuthorSectionProps) => {
    const { id } = props

    const {
        data: author,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['get-author-by-id', id],
        queryFn: () => getAuthorById(id),
    })

    const renderContent = useCallback(() => {
        const hasError = isError || !author

        if (isLoading) {
            return <Loader />
        }

        if (hasError) {
            return (
                <section className='book-details__error'>
                    <h2>{error?.message ?? 'Erro inesperado'}</h2>
                </section>
            )
        }

        return (
            <section className='book-details__about-section'>
                <h3 className='book-details__about-section__title'>Sobre o livro</h3>
                <p className='book-details__about-section__paragraph'>{author.about}</p>
            </section>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [author?.about, error?.message, isError, isLoading])

    return renderContent()
}

export { AuthorSection }
