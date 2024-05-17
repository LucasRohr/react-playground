import { atom } from 'jotai'
import { QuestionsListInterface } from '@factories'

const searchQuestionsAtom = atom<QuestionsListInterface>({
    questions: [
        {
            type: '',
            difficulty: '',
            score: 0,
            category: '',
            question: '',
            correctAnswer: '',
            incorrectAnswers: [''],
        },
    ],
})

export { searchQuestionsAtom }
