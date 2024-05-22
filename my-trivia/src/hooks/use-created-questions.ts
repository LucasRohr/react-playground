import { useState } from 'react'
import { useAtomValue } from 'jotai'

import { createdQuestionsAtom } from '@store'
import type { CreatedQuestionInterface } from '@services'

interface UseCreatedQuestionsInterface {
    filters?: {
        category: string
        difficulty: string
        type: string
    }
}

export function useCreatedQuestions(params: UseCreatedQuestionsInterface) {
    const [filteredCreatedQuestions, setFilteredCreatedQuestions] = useState<
        CreatedQuestionInterface[]
    >([])
    const createdQuestions = useAtomValue(createdQuestionsAtom)

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

        setFilteredCreatedQuestions(questions)
    }

    return { createdQuestions, filteredCreatedQuestions }
}
