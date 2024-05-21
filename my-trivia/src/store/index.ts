import { createStore } from 'jotai'

import { scoreAtom } from './score'
import { homeQuestionsAtom } from './home-questions'
import { searchQuestionsAtom } from './search-questions'
import { historyQuestionsAtom } from './history-questions'
import { createdQuestionsAtom } from './created-questions'

const store = createStore()

export {
    store,
    scoreAtom,
    homeQuestionsAtom,
    searchQuestionsAtom,
    historyQuestionsAtom,
    createdQuestionsAtom,
}
