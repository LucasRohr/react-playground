import { atom } from 'jotai'

import { QuestionInterface } from '@factories'

const createdQuestionsAtom = atom<QuestionInterface[]>([])

export { createdQuestionsAtom }
