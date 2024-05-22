const FORM_DEFAULT_VALUES = Object.freeze({
    question: '',
    category: '',
    difficulty: '',
    type: '',
    correctAnswer: '',
    incorrectAnswers: [],
})

const INPUT_NAMES = Object.freeze({
    QUESTION: 'question',
    CATEGORY: 'category',
    DIFFICULTY: 'difficulty',
    TYPE: 'type',
    CORRECT_ANSWER: 'correctAnswer',
    INCORRECT_ANSWER: 'incorrectAnswer',
})

const INPUT_IDS = Object.freeze({
    QUESTION: 'question-create-question',
    CATEGORY: 'question-create-category',
    DIFFICULTY: 'question-create-difficulty',
    TYPE: 'question-create-type',
    CORRECT_ANSWER: 'question-create-correct-answer',
    INCORRECT_ANSWER: 'question-create-incorrect-answer',
})

export { FORM_DEFAULT_VALUES, INPUT_NAMES, INPUT_IDS }
