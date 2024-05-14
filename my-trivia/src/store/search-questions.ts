import { atom } from 'jotai'

const searchQuestionsAtom = atom({
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
