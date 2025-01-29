import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { AbGrupoOpcao, AbGrupoOpcoes } from 'ds-alurabooks'
import { AbInputQuantidade } from 'ds-alurabooks'

import { getBookBySlug } from '../../http/get-book-by-slug'
import { MainTitle } from '../../componentes/MainTitle'
import { useCallback, useMemo, useState } from 'react'
import { Loader } from '../../componentes/Loader'
import { IBook } from '../../interfaces/ILivro'

const BookDetails = () => {
    const [bookQuantity, setBookQuantity] = useState<number>(1)

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
        const { coverImage, title, description, writer } = bookDetails as IBook

        return (
            <section className='book-details__product'>
                <img src={coverImage} alt='book-details-cover-image' />

                <section className='book-details__product__info'>
                    <h2 className='book-details__product__info__title'>{title}</h2>
                    <p className='book-details__product__info__description'>{description}</p>
                    <span className='book-details__product__info__writer'>Por: {writer}</span>

                    <h3 className='book-details__product__info__buy-options-label'>
                        Selecione o formato do seu livro
                    </h3>

                    <AbGrupoOpcoes opcoes={buyOptionsMapped} />

                    <p className='book-details__product__info__access-message'>
                        *Você terá acesso às futuras atualizações do livro
                    </p>

                    <h3 className='book-details__product__info__quantity-label'>Quantidade</h3>

                    <AbInputQuantidade value={bookQuantity} onChange={setBookQuantity} />

                    <button className='book-details__product__info__button'>Comprar</button>
                </section>
            </section>
        )
    }, [bookDetails, bookQuantity, buyOptionsMapped])

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
            </>
        )
    }, [isError, bookDetails, isLoading, renderBookSection, renderAboutSection, error?.message])

    return (
        <section className='book-details'>
            <MainTitle title='Detalhes do livro' />
            {renderContent()}
        </section>
    )
}

export { BookDetails }
