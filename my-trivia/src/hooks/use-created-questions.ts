import { useAtomValue, useSetAtom } from 'jotai'

import { createdQuestionsAtom, homeQuestionsAtom, searchQuestionsAtom } from '@store'

interface UseCreatedQuestionsInterface {
    filters?: {
        category: string
        difficulty: string
        type: string
    }
}

export function useCreatedQuestions(params: UseCreatedQuestionsInterface) {
    const createdQuestions = useAtomValue(createdQuestionsAtom)

    const setHomeQuestions = useSetAtom(homeQuestionsAtom)
    const setSearchQuestions = useSetAtom(searchQuestionsAtom)

    const { filters } = params

    // Condition to filter the created questions for applying them on question search results
    if (filters) {
        const questions = createdQuestions.filter((question) => {
            const isSameCategory = filters.category.length
                ? question.category === filters.category
                : true

            const isSameDifficulty = filters.difficulty.length
                ? question.difficulty === filters.difficulty
                : true

            const isSameType = filters.type.length ? question.type === filters.type : true

            return isSameCategory && isSameDifficulty && isSameType
        })

        setHomeQuestions((prevQuestions) => ({
            questions: [...prevQuestions.questions, ...questions],
        }))
    } else {
        setSearchQuestions((prevQuestions) => ({
            questions: [...prevQuestions.questions, ...createdQuestions],
        }))
    }

    return { createdQuestions }
}
