import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbBotao } from 'ds-alurabooks'

import { getBookBySlug } from '../../http/get-book-by-slug'
import { MainTitle } from '../../componentes/MainTitle'
import { useCallback, useMemo, useState } from 'react'
import { Loader } from '../../componentes/Loader'
import { IBook } from '../../interfaces/IBook'
import { AuthorSection } from './components/AuthorSection'
import { AxiosError } from 'axios'
import { getAuthorById } from '../../http/get-author-by-id'

import './BookDetails.scss'

const BookDetails = () => {
    const [bookQuantity, setBookQuantity] = useState<number>(1)

    const location = useLocation()
    const { slug } = location.state || {}

    const {
        data: bookDetails,
        isLoading,
        isError,
        error,
    } = useQuery<IBook | null, AxiosError>({
        queryKey: ['get-book-by-slug', slug],
        queryFn: () => getBookBySlug(slug ?? ''),
    })

    const {
        data: author,
        isLoading: isLoadingAuthor,
        isError: isErrorAuthor,
        error: errorAuthor,
    } = useQuery({
        queryKey: ['get-author-by-id', bookDetails?.writer],
        queryFn: () => getAuthorById(bookDetails?.writer ?? 0),
    })

    console.log({
        bookDetails,
        error,
    })

    const buyOptionsMapped = useMemo((): AbGrupoOpcao[] => {
        const options = bookDetails?.buyOptions

        const mappedOptions = options?.map((option) => ({
            id: option.id,
            titulo: option.title,
            corpo: `R$ ${option.price}`,
            rodape: option.formats?.join(', ') ?? '',
        })) as AbGrupoOpcao[]

        return mappedOptions
    }, [bookDetails?.buyOptions])

    const renderBookSection = useCallback(() => {
        const { coverImage, title, description } = bookDetails as IBook

        return (
            <section className='book-details__product'>
                <img
                    className='book-details__product__image'
                    src={coverImage}
                    alt='book-details-cover-image'
                />

                <section className='book-details__product__info'>
                    <h2 className='book-details__product__info__title'>{title}</h2>
                    <p className='book-details__product__info__description'>{description}</p>
                    <span className='book-details__product__info__writer'>Por: {author?.name}</span>

                    <h3 className='book-details__product__info__buy-options-label'>
                        Selecione o formato do seu livro
                    </h3>

                    <AbGrupoOpcoes opcoes={buyOptionsMapped} />

                    <p className='book-details__product__info__access-message'>
                        *Você terá acesso às futuras atualizações do livro
                    </p>

                    <h3 className='book-details__product__info__quantity-label'>Quantidade</h3>

                    <AbInputQuantidade value={bookQuantity} onChange={setBookQuantity} />

                    <AbBotao texto='Comprar' />
                </section>
            </section>
        )
    }, [bookDetails, author?.name, bookQuantity, buyOptionsMapped])

    const renderAboutSection = useCallback(() => {
        const { about } = bookDetails as IBook

        return (
            <section className='book-details__about-section'>
                <h3 className='book-details__about-section__title'>Sobre o livro</h3>
                <p className='book-details__about-section__paragraph'>{about}</p>
            </section>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookDetails?.about])

    const renderAuthorSection = useCallback(() => {
        const hasError = isErrorAuthor || !author

        if (isLoadingAuthor) {
            return <Loader />
        }

        if (hasError) {
            return (
                <section className='book-details__error'>
                    <h2>{errorAuthor?.message ?? 'Erro inesperado'}</h2>
                </section>
            )
        }

        return <AuthorSection about={author?.about} />
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [author?.about, errorAuthor?.message, isErrorAuthor, isLoadingAuthor])

    const renderContent = useCallback(() => {
        const hasError = isError ?? !bookDetails

        if (isLoading) {
            return (
                <section className='book-details__loader'>
                    <Loader />
                </section>
            )
        }

        if (hasError) {
            return (
                <section className='book-details__error'>
                    <h2>{error?.message ?? 'Erro inesperado'}</h2>
                </section>
            )
        }

        return (
            <>
                {renderBookSection()}
                {renderAboutSection()}
                {renderAuthorSection()}
            </>
        )
    }, [
        isError,
        bookDetails,
        isLoading,
        renderBookSection,
        renderAboutSection,
        renderAuthorSection,
        error?.message,
    ])

    return (
        <section className='book-details'>
            <MainTitle title='Detalhes do livro' />
            {renderContent()}
        </section>
    )
}

export { BookDetails }
