import { QuestionsService } from '@services'
import { useQuery } from '@tanstack/react-query'

const RANDOM_QUESTIONS_AMOUNT = 10

export function HomePage() {
    const questionsService = new QuestionsService()

    const questions = useQuery({
        queryKey: ['home-questions'],
        queryFn: () => questionsService.getQuestions({ amount: RANDOM_QUESTIONS_AMOUNT }),
    })

    return <div>home-page</div>
}
