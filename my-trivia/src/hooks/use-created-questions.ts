import { useState } from 'react'
import { useAtom } from 'jotai'

import { createdQuestionsAtom } from '@store'
import type { CreatedQuestionInterface } from '@services'

interface UseCreatedQuestionsInterface {
    newQuestion?: CreatedQuestionInterface
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
    const [createdQuestions, setCreatedQuestions] = useAtom(createdQuestionsAtom)

    const { newQuestion, filters } = params

    if (newQuestion) {
        setCreatedQuestions([...createdQuestions, newQuestion])
    }

    if (filters) {
        const questions = createdQuestions.filter(
            (question) =>
                question.category === filters.category &&
                question.difficulty === filters.difficulty &&
                question.type === filters.type
        )

        setFilteredCreatedQuestions(questions)
    }

    return { createdQuestions, filteredCreatedQuestions }
}
