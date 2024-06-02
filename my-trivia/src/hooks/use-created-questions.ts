import { useAtom, useAtomValue } from 'jotai'

import { createdQuestionsAtom, homeQuestionsAtom, searchQuestionsAtom } from '@store'
import { QuestionsListInterface } from '@factories'
import { useEffect } from 'react'

interface UseCreatedQuestionsInterface {
    questions?: QuestionsListInterface
    filters?: {
        category: string
        difficulty: string
        type: string
    }
}

export function useCreatedQuestions(params: UseCreatedQuestionsInterface) {
    const createdQuestions = useAtomValue(createdQuestionsAtom)

    const [homeQuestions, setHomeQuestions] = useAtom(homeQuestionsAtom)
    const [searchQuestions, setSearchQuestions] = useAtom(searchQuestionsAtom)

    const { questions, filters } = params
    const parsedQuestions = questions ?? { questions: [] }

    useEffect(() => {
        // Condition to filter the created questions for applying them on question search results
        if (filters) {
            const filteredQuestions = createdQuestions.filter((question) => {
                const isSameCategory = filters.category.length
                    ? question.category === filters.category
                    : true

                const isSameDifficulty = filters.difficulty.length
                    ? question.difficulty === filters.difficulty
                    : true

                const isSameType = filters.type.length ? question.type === filters.type : true

                return isSameCategory && isSameDifficulty && isSameType
            })

            setSearchQuestions({
                questions: [...parsedQuestions.questions, ...filteredQuestions],
            })
        } else {
            setSearchQuestions({
                questions: [...parsedQuestions.questions, ...createdQuestions],
            })
            setHomeQuestions({
                questions: [...parsedQuestions.questions, ...createdQuestions],
            })
        }
    }, [createdQuestions, filters, parsedQuestions.questions, setHomeQuestions, setSearchQuestions])

    return { homeQuestions, searchQuestions }
}
