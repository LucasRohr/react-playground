import { QUESTIONS_FILTERS, SCORES } from '@constants'
import type { QuestionInterface } from './question-type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function questionFactory(object: any): QuestionInterface | null {
    if (!object) {
        return null
    }

    const { type, difficulty, category, question, correct_answer, incorrect_answers } = object

    const questionText: string = question ?? ''
    const parsedQuestionText = questionText.replace(/&quot;/g, '"').replace(/&#039;/g, "'")

    const questionType = type ?? ''

    const upperQuestionType = questionType.toUpperCase()
    const parsedType =
        QUESTIONS_FILTERS.TYPE[upperQuestionType as keyof typeof QUESTIONS_FILTERS.TYPE]

    const questionDifficulty = difficulty ?? ''
    const upperQuestionDifficulty = questionDifficulty.toUpperCase()
    const parsedDifficulty =
        QUESTIONS_FILTERS.DIFFICULTY[
            upperQuestionDifficulty as keyof typeof QUESTIONS_FILTERS.DIFFICULTY
        ]

    const parsedIncorrectAnswers = incorrect_answers.map((answerText: string) =>
        answerText.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    )

    const parsedScore = SCORES[parsedDifficulty as keyof typeof SCORES]

    return {
        category: category ?? '',
        question: parsedQuestionText,
        correctAnswer: correct_answer ?? '',
        incorrectAnswers: parsedIncorrectAnswers ?? [],
        type: parsedType,
        difficulty: parsedDifficulty,
        score: parsedScore,
    }
}
