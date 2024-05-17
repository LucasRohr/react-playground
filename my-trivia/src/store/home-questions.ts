import { atom } from 'jotai'
import { QuestionsListInterface } from '@factories'

const homeQuestionsAtom = atom<QuestionsListInterface>({
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

export { homeQuestionsAtom }
