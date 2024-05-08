import { atom } from 'jotai'

const historyQuestionsAtom = atom([
    {
        type: '',
        difficulty: '',
        score: 0,
        category: '',
        question: '',
        correctAnswer: '',
        incorrectAnswers: [''],
    },
])

export { historyQuestionsAtom }
