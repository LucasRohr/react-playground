import { CreatedQuestionInterface } from '@services'
import { atom } from 'jotai'

const createdQuestionsAtom = atom<CreatedQuestionInterface[]>([])

export { createdQuestionsAtom }
