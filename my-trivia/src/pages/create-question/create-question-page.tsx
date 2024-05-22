import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'

import { MTButton, MTInput } from '@components'
import { createdQuestionsAtom } from '@store'

import { CREATE_QUESTION_PAGE_STRINGS } from './create-question-strings'
import {
    CreateQuestionContainer,
    CreateQuestionSearchForm,
    SelectCategoryContainer,
    SelectDifficultyContainer,
    SelectTypeContainer,
    SubmitButtonWrapper,
    Title,
} from './create-question-style'
import type { QuestionCreateFormInterface } from './create-question-types'
import { FORM_DEFAULT_VALUES, INPUT_IDS, INPUT_NAMES } from './create-questions-constants'
import { QUESTION_CATEGORIES, QUESTION_FILTER_LABELS, QUESTIONS_FILTERS } from '@constants'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'

export function CreateQuestionPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<QuestionCreateFormInterface>({
        defaultValues: FORM_DEFAULT_VALUES,
    })

    const setCreatedQuestions = useSetAtom(createdQuestionsAtom)

    const { question, category, difficulty, type, correctAnswer, incorrectAnswers } = watch() // Watch over form changes to build the question

    const saveCreatedQuestion = () => {
        if (!isValid) {
            return null
        }

        const newQuestion = {
            id: Math.floor(Math.random()),
            question,
            category,
            difficulty,
            type,
            correctAnswer,
            incorrectAnswers,
        }

        setCreatedQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    }

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

    const renderCategoryField = () => {
        const renderCategories = () =>
            Object.values(QUESTION_CATEGORIES).map((category) => (
                <MenuItem value={category.ID}>{category.LABEL}</MenuItem>
            ))

        return (
            <SelectCategoryContainer>
                <FormControl fullWidth>
                    <InputLabel id={INPUT_IDS.CATEGORY}>
                        {CREATE_QUESTION_PAGE_STRINGS.CATEGORY_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.CATEGORY}
                        id={INPUT_IDS.CATEGORY}
                        label={CREATE_QUESTION_PAGE_STRINGS.CATEGORY_INPUT_LABEL}
                        {...register(INPUT_NAMES.CATEGORY)}
                    >
                        {renderCategories()}
                    </Select>
                </FormControl>
            </SelectCategoryContainer>
        )
    }

    const renderDifficultyField = () => {
        return (
            <SelectDifficultyContainer>
                <FormControl fullWidth>
                    <InputLabel id={INPUT_IDS.DIFFICULTY}>
                        {CREATE_QUESTION_PAGE_STRINGS.DIFFICULTY_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.DIFFICULTY}
                        id={INPUT_IDS.DIFFICULTY}
                        label={CREATE_QUESTION_PAGE_STRINGS.DIFFICULTY_INPUT_LABEL}
                        {...register(INPUT_NAMES.DIFFICULTY)}
                    >
                        <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.EASY.toLowerCase()}>
                            {QUESTION_FILTER_LABELS.DIFFICULTY.EASY}
                        </MenuItem>
                        <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.MEDIUM.toLowerCase()}>
                            {QUESTION_FILTER_LABELS.DIFFICULTY.MEDIUM}
                        </MenuItem>
                        <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.HARD.toLowerCase()}>
                            {QUESTION_FILTER_LABELS.DIFFICULTY.HARD}
                        </MenuItem>
                    </Select>
                </FormControl>
            </SelectDifficultyContainer>
        )
    }

    const renderTypeField = () => {
        return (
            <SelectTypeContainer>
                <FormControl fullWidth>
                    <InputLabel id={INPUT_IDS.TYPE}>
                        {CREATE_QUESTION_PAGE_STRINGS.TYPE_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.TYPE}
                        id={INPUT_IDS.TYPE}
                        label={CREATE_QUESTION_PAGE_STRINGS.TYPE_INPUT_LABEL}
                        {...register(INPUT_NAMES.TYPE)}
                    >
                        <MenuItem value={QUESTIONS_FILTERS.TYPE.MULTIPLE.toLowerCase()}>
                            {QUESTION_FILTER_LABELS.TYPE.MULTIPLE}
                        </MenuItem>
                        <MenuItem value={QUESTIONS_FILTERS.TYPE.BOOLEAN.toLowerCase()}>
                            {QUESTION_FILTER_LABELS.TYPE.BOOLEAN}
                        </MenuItem>
                    </Select>
                </FormControl>
            </SelectTypeContainer>
        )
    }

    const renderAnswersContent = () => {
        const isBooleanType = type === QUESTIONS_FILTERS.TYPE.BOOLEAN.toLowerCase()

        const renderBooleanTypeFields = () => {
            return (
                <ToggleButtonGroup
                    color='primary'
                    value={correctAnswer}
                    exclusive
                    {...register(INPUT_NAMES.CORRECT_ANSWER)}
                >
                    <ToggleButton value={CREATE_QUESTION_PAGE_STRINGS.TRUE_RADIO_LABEL}>
                        {CREATE_QUESTION_PAGE_STRINGS.TRUE_RADIO_LABEL}
                    </ToggleButton>
                    <ToggleButton value={CREATE_QUESTION_PAGE_STRINGS.FALSE_RADIO_LABEL}>
                        {CREATE_QUESTION_PAGE_STRINGS.FALSE_RADIO_LABEL}
                    </ToggleButton>
                </ToggleButtonGroup>
            )
        }

        const renderMultipleTypeFields = () => {
            return null
        }

        if (!type) {
            return null
        }

        return isBooleanType ? renderBooleanTypeFields() : renderMultipleTypeFields()
    }

    return (
        <CreateQuestionContainer>
            <Title>{CREATE_QUESTION_PAGE_STRINGS.TITLE}</Title>

            <CreateQuestionSearchForm onSubmit={handleSubmit(saveCreatedQuestion)}>
                {renderQuestionField()}
                {renderCategoryField()}
                {renderDifficultyField()}
                {renderTypeField()}
                {renderAnswersContent()}

                <SubmitButtonWrapper>
                    <MTButton $isPrimary type='submit' onClick={() => {}}>
                        {CREATE_QUESTION_PAGE_STRINGS.CREATE_BUTTON_LABEL}
                    </MTButton>
                </SubmitButtonWrapper>
            </CreateQuestionSearchForm>
        </CreateQuestionContainer>
    )
}
