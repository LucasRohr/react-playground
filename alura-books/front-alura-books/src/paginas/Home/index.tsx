import { AbCampoTexto } from 'ds-alurabooks'
import { useCallback, useState } from 'react'
import Banner from '../../componentes/Banner'
import LivrosDestaque from '../../componentes/LivrosDestaque'
import Newsletter from '../../componentes/Newsletter'
import TagsCategorias from '../../componentes/TagsCategorias'
import Titulo from '../../componentes/Titulo'

import './Home.css'
import { useQuery } from '@tanstack/react-query'
import { getNewBooks } from '../../http/get-new-books'
import { getBestSellerBooks } from '../../http/get-best-seller-books'
import { Loader } from '../../componentes/Loader'

const Home = () => {
    const [busca, setBusca] = useState('')

    const {
        data: newBooks,
        isLoading: isLoadingNew,
        isError: isErrorNew,
    } = useQuery({ queryKey: ['new-books'], queryFn: getNewBooks })

    const {
        data: bestSellerBooks,
        isLoading: isLoadingBestSellers,
        isError: isErrorBestSellers,
    } = useQuery({
        queryKey: ['best-seller-books'],
        queryFn: getBestSellerBooks,
    })

    const renderBooks = useCallback(() => {
        const isLoading = isLoadingNew || isLoadingBestSellers
        const hasError = isErrorNew || isErrorBestSellers

        if (isLoading) {
            return <Loader />
        }

        if (hasError) {
            return <Titulo texto='Erro inesperado' />
        }

        return (
            <>
                <Titulo texto='ÚLTIMOS LANÇAMENTOS' />
                <LivrosDestaque livros={newBooks ?? []} />
                <Titulo texto='MAIS VENDIDOS' />
                <LivrosDestaque livros={bestSellerBooks ?? []} />
            </>
        )
    }, [
        newBooks,
        bestSellerBooks,
        isLoadingNew,
        isLoadingBestSellers,
        isErrorNew,
        isErrorBestSellers,
    ])

    return (
        <section className='home'>
            <Banner
                subtitulo='Encontre em nossa estante o que precisa para seu desenvolvimento!'
                titulo='Já sabe por onde começar?'
            >
                <form className='buscar'>
                    <AbCampoTexto
                        placeholder='Qual será sua próxima leitura?'
                        value={busca}
                        onChange={setBusca}
                        darkmode={true}
                        placeholderAlign='center'
                    />
                </form>
            </Banner>
            {renderBooks()}
            <TagsCategorias />
            <Newsletter />
        </section>
    )
}

export default Home
