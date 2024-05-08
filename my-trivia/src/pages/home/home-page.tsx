import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { QuestionsService } from '@services'
import { QuestionsListInterface } from '@factories'
import { QuestionCardComponent } from '@components'
import { homeQuestionsAtom } from '@store'

import { HomeContainer, Title } from './home-page-style'
import { HOME_PAGE_STRINGS } from './home-page-strings'
import { useCallback } from 'react'

const RANDOM_QUESTIONS_AMOUNT = 10

export function HomePage() {
    const questionsService = new QuestionsService()

    const [homeQuestions, setHomeQuestions] = useAtom(homeQuestionsAtom)

    const {
        error,
        isPending: isLoading,
        isFetching: isRequesting,
        data: questionsResponse,
    } = useQuery({
        queryKey: ['home-questions'],
        queryFn: () => questionsService.getQuestions({ amount: RANDOM_QUESTIONS_AMOUNT }),
        enabled: homeQuestions === undefined || homeQuestions?.questions?.length === 1,
    })

    const questionsList = questionsResponse as QuestionsListInterface
    setHomeQuestions(questionsList)

    const renderQuestions = useCallback(() => {
        const shouldShowLoader = isLoading || isRequesting

        if (shouldShowLoader) {
            return <CircularProgress color='primary' size={80} />
        }

        if (error) {
            return <p>{error.message}</p>
        }

        if (!homeQuestions || !homeQuestions?.questions) {
            return null
        }

        return homeQuestions?.questions.map((question, index) => {
            return <QuestionCardComponent key={index} itemKey={index} {...question} />
        })
    }, [error, homeQuestions, isLoading, isRequesting])

    return (
        <HomeContainer>
            <Title>{HOME_PAGE_STRINGS.TITLE}</Title>
            {renderQuestions()}
        </HomeContainer>
    )
}
