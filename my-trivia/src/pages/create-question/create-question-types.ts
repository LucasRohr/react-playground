export interface QuestionCreateFormInterface {
    question: string
    category: string
    difficulty: string
    type: string
    correctAnswer: string
    incorrectAnswers: string[]
}
