export interface QuestionCardComponentPropTypes {
    category: string
    difficulty: string
    question: string
    correctAnswer: string
    incorrectAnswers: string[]
    score: number
    userAnswer?: string
}
