import React, { useCallback, useEffect, useState } from 'react'
import { MainTitle } from '../../componentes/MainTitle'
import { CategoryInterface } from '../../interfaces'
import http from '../../http'
import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'

const CategoryPage = () => {
    const [category, setCategory] = useState<CategoryInterface>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const routeParams = useParams()

    const getCategory = useCallback(async () => {
        setIsLoading(true)

        const response = await http.get<CategoryInterface[]>('categorias', {
            params: {
                slug: routeParams.slug,
            },
        })

        const isValidResponse = response.data && response.data.length

        if (isValidResponse) {
            setIsLoading(false)
            setCategory(response.data[0])
        }
    }, [routeParams.slug])

    useEffect(() => {
        getCategory()
    }, [getCategory])

    const renderContent = useCallback(() => {
        if (isLoading) {
            return <Loader />
        }

        return (
            <section>
                <MainTitle title={category?.nome ?? 'Carregando...'} />
            </section>
        )
    }, [isLoading, category])

    return renderContent()
}

export { CategoryPage }
