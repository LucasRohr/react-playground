import { createStore } from 'jotai'

import { scoreAtom } from './score'
import { homeQuestionsAtom } from './home-questions'

const store = createStore()

export { store, scoreAtom, homeQuestionsAtom }
