import { useCallback } from 'react'
import { useAtomValue } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { QuestionsService } from '@services'
import { QuestionCardComponent } from '@components'
import { homeQuestionsAtom } from '@store'
import { useCreatedQuestions } from '@hooks'
import { QuestionsListInterface } from '@factories'

import { HomeContainer, Title } from './home-page-style'
import { HOME_PAGE_STRINGS } from './home-page-strings'

const RANDOM_QUESTIONS_AMOUNT = 10

export function HomePage() {
    const questionsService = new QuestionsService()

    const homeQuestions = useAtomValue(homeQuestionsAtom)

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

    const { homeQuestions: questionsList } = useCreatedQuestions({
        questions: questionsResponse as QuestionsListInterface,
    })

    const renderQuestions = useCallback(() => {
        const shouldShowLoader = isLoading || isRequesting

        if (shouldShowLoader) {
            return <CircularProgress color='primary' size={80} />
        }

        if (error) {
            return <p>{error.message}</p>
        }

        if (!questionsList || !questionsList?.questions) {
            return null
        }

        return questionsList?.questions.map((question, index) => (
            <QuestionCardComponent key={index} questionsAtom={homeQuestionsAtom} {...question} />
        ))
    }, [error, questionsList, isLoading, isRequesting])

    return (
        <HomeContainer>
            <Title>{HOME_PAGE_STRINGS.TITLE}</Title>
            {renderQuestions()}
        </HomeContainer>
    )
}
