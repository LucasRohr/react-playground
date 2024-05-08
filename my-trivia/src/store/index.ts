import { createStore } from 'jotai'

import { scoreAtom } from './score'
import { homeQuestionsAtom } from './home-questions'
import { historyQuestionsAtom } from './history-questions'

const store = createStore()

export { store, scoreAtom, homeQuestionsAtom, historyQuestionsAtom }
