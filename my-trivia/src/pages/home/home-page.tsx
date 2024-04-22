import { useQuery } from '@tanstack/react-query'

import { QuestionsService } from '@services'

import { HomeContainer, Title } from './home-page-style'
import { HOME_PAGE_STRINGS } from './home-page-strings'
import { QuestionsListInterface } from '@factories/questions-list/questions-list-type'

const RANDOM_QUESTIONS_AMOUNT = 10

export function HomePage() {
    const questionsService = new QuestionsService()

    const { isPending: isLoading, data: questionsResponse } = useQuery({
        queryKey: ['home-questions'],
        queryFn: () => questionsService.getQuestions({ amount: RANDOM_QUESTIONS_AMOUNT }),
    })

    function renderQuestions() {
        const questionsList = questionsResponse as QuestionsListInterface

        if (isLoading) {
            return <span>...</span>
        }

        if (!questionsList || !questionsList.questions) {
            return null
        }

        return questionsList.questions.map((question) => {
            return <p>{question.question}</p>
        })
    }

    return (
        <HomeContainer>
            <Title>{HOME_PAGE_STRINGS.TITLE}</Title>
            {renderQuestions()}
        </HomeContainer>
    )
}
