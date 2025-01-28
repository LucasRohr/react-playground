import { useQuery } from '@tanstack/react-query'
import { BooksListProps } from './types'
import { getCategoryBooks } from '../../http/get-category-books'
import { useCallback } from 'react'
import { Loader } from '../Loader'
import Titulo from '../Titulo'
import { BookItemCard } from '../BookItem'

import './BooksList.scss'

const BooksList = ({ category }: BooksListProps) => {
    const {
        data: books,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['get-category-books', category],
        queryFn: () => getCategoryBooks(category),
    })

    const renderBooksList = useCallback(() => {
        const hasError = isError || !books

        if (isLoading) {
            return <Loader />
        }

        if (hasError) {
            return <Titulo texto='Erro inesperado' />
        }

        return books.map((book, index) => {
            const { title, slug, coverImage, buyOptions } = book

            buyOptions.sort((a, b) => a.price - b.price)

            return (
                <BookItemCard
                    key={index}
                    title={title}
                    slug={slug}
                    coverImage={coverImage}
                    minPrice={buyOptions[0].price}
                />
            )
        })
    }, [books, isLoading, isError])

    return <section className='books-list-container'>{renderBooksList()}</section>
}

export { BooksList }
