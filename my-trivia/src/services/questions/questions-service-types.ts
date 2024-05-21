interface GetQuestionsParamsInterface {
    amount: number
    category?: string
    difficulty?: string
    type?: string
}

interface CreateQuestionDataInterface {
    id: number
    question: string
    category: string
    difficulty: string
    type: string
    correctAnswer: string
    incorrectAnswers: string[]
}

export type { GetQuestionsParamsInterface, CreateQuestionDataInterface }
