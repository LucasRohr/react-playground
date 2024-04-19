import { QUESTIONS_FILTERS, SCORES } from '@constants'
import type { QuestionInterface } from './question-type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function questionFactory(object: any): QuestionInterface | null {
    if (!object) {
        return null
    }

    const { type, difficulty, category, question, correct_answer, incorrect_answers } = object

    const questionType = type ?? ''
    const parsedType = QUESTIONS_FILTERS.TYPE[questionType as keyof typeof QUESTIONS_FILTERS.TYPE]

    const questionDifficulty = difficulty ?? ''
    const parsedDifficulty =
        QUESTIONS_FILTERS.DIFFICULTY[
            questionDifficulty as keyof typeof QUESTIONS_FILTERS.DIFFICULTY
        ]

    const parsedScore = SCORES[parsedDifficulty as keyof typeof SCORES]

    return {
        category: category ?? '',
        question: question ?? '',
        correctAnswer: correct_answer ?? '',
        incorrectAnswers: incorrect_answers ?? [],
        type: parsedType,
        difficulty: parsedDifficulty,
        score: parsedScore,
    }
}
