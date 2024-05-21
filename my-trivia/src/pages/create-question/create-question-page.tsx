import { useForm } from 'react-hook-form'

import { MTButton, MTInput } from '@components'

import { CREATE_QUESTION_PAGE_STRINGS } from './create-question-strings'
import { CreateQuestionContainer, CreateQuestionSearchForm, Title } from './create-question-style'

interface QuestionCreateFormInterface {
    question: string
    category: string
    difficulty: string
    type: string
    correctAnswer: string
    incorrectAnswers: string[]
}

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
    CORRECT_ANSWER: 'correct_answer',
    INCORRECT_ANSWER: 'incorrect_answer',
})

const INPUT_IDS = Object.freeze({
    QUESTION: 'question-create-question',
    CATEGORY: 'question-create-category',
    DIFFICULTY: 'question-create-difficulty',
    TYPE: 'question-create-type',
    CORRECT_ANSWER: 'question-create-correct-answer',
    INCORRECT_ANSWER: 'question-create-incorrect-answer',
})

export function CreateQuestionPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
    } = useForm<QuestionCreateFormInterface>({
        defaultValues: FORM_DEFAULT_VALUES,
    })

    // const { question, category, difficulty, type, correctAnswer, incorrectAnswers } = watch() // Watch over form changes to compose GET request

    const renderQuestionField = () => {
        const error = errors.question?.message

        return (
            <MTInput
                fullWidth
                id={INPUT_IDS.QUESTION}
                label={CREATE_QUESTION_PAGE_STRINGS.QUESTION_INPUT_LABEL}
                error={error}
                registerData={register(INPUT_NAMES.QUESTION, {
                    required: CREATE_QUESTION_PAGE_STRINGS.QUESTION_INPUT_REQUIRED,
                })}
            />
        )
    }

    return (
        <CreateQuestionContainer>
            <Title>{CREATE_QUESTION_PAGE_STRINGS.TITLE}</Title>

            <CreateQuestionSearchForm onSubmit={handleSubmit(() => {})}>
                {renderQuestionField()}

                <MTButton $isPrimary type='submit' onClick={() => {}}>
                    {CREATE_QUESTION_PAGE_STRINGS.CREATE_BUTTON_LABEL}
                </MTButton>
            </CreateQuestionSearchForm>
        </CreateQuestionContainer>
    )
}
