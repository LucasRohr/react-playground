import { atom } from 'jotai'
import { QuestionInterface } from '@factories'

const historyQuestionsAtom = atom<QuestionInterface[]>([])

export { historyQuestionsAtom }
