import { atom } from 'jotai'

const homeQuestionsAtom = atom({
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
