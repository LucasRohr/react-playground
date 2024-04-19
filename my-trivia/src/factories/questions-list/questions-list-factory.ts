import { questionFactory } from '../question/question-factory'
import type { QuestionsListInterface } from './questions-list-type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function questionsListFactory(object: any): QuestionsListInterface | null {
    if (!object) {
        return null
    }

    const { results } = object

    const parsedQuestions = results ?? []

    return {
        questions: parsedQuestions.map(questionFactory),
    }
}
