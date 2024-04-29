import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { QuestionsService } from '@services'
import { QuestionsListInterface } from '@factories'
import { QuestionCardComponent } from '@components'
import { homeQuestionsAtom } from '@store'

import { HomeContainer, Title } from './home-page-style'
import { HOME_PAGE_STRINGS } from './home-page-strings'

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
        enabled: false,
    })

    function renderQuestions() {
        const questionsList = questionsResponse as QuestionsListInterface
        const shouldShowLoader = isLoading || isRequesting

        setHomeQuestions(questionsList)

        if (shouldShowLoader) {
            return <CircularProgress color='primary' size={80} />
        }

        if (error) {
            return <p>{error.message}</p>
        }

        if (!questionsList || !questionsList.questions) {
            return null
        }

        return questionsList.questions.map((question) => {
            return <QuestionCardComponent {...question} />
        })
    }

    return (
        <HomeContainer>
            <Title>{HOME_PAGE_STRINGS.TITLE}</Title>
            {renderQuestions()}
        </HomeContainer>
    )
}
