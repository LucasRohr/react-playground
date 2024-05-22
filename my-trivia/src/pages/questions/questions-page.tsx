import { useForm } from 'react-hook-form'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { QUESTION_CATEGORIES, QUESTION_FILTER_LABELS, QUESTIONS_FILTERS } from '@constants'
import { MTButton, MTInput, QuestionCardComponent } from '@components'

import { QUESTIONS_PAGE_STRINGS } from './questions-page-strings'
import {
    QuestionsContainer,
    QuestionsSearchForm,
    SelectCategoryContainer,
    SelectDifficultyContainer,
    SelectTypeContainer,
    Title,
} from './questions-page-style'
import { useQuery } from '@tanstack/react-query'
import { QuestionsService } from '@services'
import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { searchQuestionsAtom } from '@store'
import { QuestionsListInterface } from '@factories'

interface QuestionsSearchFormInterface {
    quantity: number
    category: string
    difficulty: string
    type: string
}

const FORM_DEFAULT_VALUES = Object.freeze({
    quantity: 10,
    category: '',
    difficulty: '',
    type: '',
})

const INPUT_NAMES = Object.freeze({
    QUANTITY: 'quantity',
    CATEGORY: 'category',
    DIFFICULTY: 'difficulty',
    TYPE: 'type',
})

const INPUT_IDS = Object.freeze({
    QUANTITY: 'questions-search-quantity',
    CATEGORY: 'questions-search-category',
    DIFFICULTY: 'questions-search-difficulty',
    TYPE: 'questions-search-type',
})

const QUANTITY_INPUT_MAX_VALUE = 30

export function QuestionsPage() {
    const questionsService = new QuestionsService()

    const [shouldSearch, setShouldSearch] = useState(false)

    const [searchQuestions, setSearchQuestions] = useAtom(searchQuestionsAtom)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid: isFormValid },
        watch,
    } = useForm<QuestionsSearchFormInterface>({
        defaultValues: FORM_DEFAULT_VALUES,
    })

    const { quantity, category, difficulty, type } = watch() // Watch over form changes to compose GET request

    const {
        error,
        isPending: isLoading,
        isFetching: isRequesting,
        data: questionsResponse,
    } = useQuery({
        queryKey: ['search-questions'],
        queryFn: () =>
            questionsService.getQuestions({ amount: quantity, category, difficulty, type }),
        enabled: shouldSearch,
    })

    useEffect(() => {
        const questionsList = questionsResponse as QuestionsListInterface
        setSearchQuestions(questionsList)

        if (questionsList) {
            setShouldSearch(false)
        }
    }, [questionsResponse, setSearchQuestions])

    const renderQuestions = useCallback(() => {
        const shouldShowLoader = shouldSearch && (isLoading || isRequesting)

        if (shouldShowLoader) {
            return <CircularProgress color='primary' size={80} />
        }

        if (error) {
            return <p>{error.message}</p>
        }

        if (!searchQuestions || !searchQuestions?.questions) {
            return null
        }

        return searchQuestions?.questions.map((question, index) => (
            <QuestionCardComponent key={index} questionsAtom={searchQuestionsAtom} {...question} />
        ))
    }, [error, searchQuestions, shouldSearch, isLoading, isRequesting])

    const renderQuantityField = () => {
        const error = errors.quantity?.message

        return (
            <MTInput
                id={INPUT_IDS.QUANTITY}
                label={QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_LABEL}
                type='number'
                error={error}
                registerData={register(INPUT_NAMES.QUANTITY, {
                    required: QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_REQUIRED,
                    max: {
                        value: QUANTITY_INPUT_MAX_VALUE,
                        message: QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_MAX,
                    },
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
                        {QUESTIONS_PAGE_STRINGS.CATEGORY_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.CATEGORY}
                        id={INPUT_IDS.CATEGORY}
                        label={QUESTIONS_PAGE_STRINGS.CATEGORY_INPUT_LABEL}
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
                        {QUESTIONS_PAGE_STRINGS.DIFFICULTY_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.DIFFICULTY}
                        id={INPUT_IDS.DIFFICULTY}
                        label={QUESTIONS_PAGE_STRINGS.DIFFICULTY_INPUT_LABEL}
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
                        {QUESTIONS_PAGE_STRINGS.TYPE_INPUT_LABEL}
                    </InputLabel>
                    <Select
                        margin='dense'
                        labelId={INPUT_IDS.TYPE}
                        id={INPUT_IDS.TYPE}
                        label={QUESTIONS_PAGE_STRINGS.TYPE_INPUT_LABEL}
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

    return (
        <QuestionsContainer>
            <Title>{QUESTIONS_PAGE_STRINGS.TITLE}</Title>

            <QuestionsSearchForm
                onSubmit={handleSubmit(() => {
                    if (isFormValid) {
                        setShouldSearch(true)
                    }
                })}
            >
                {renderQuantityField()}
                {renderCategoryField()}
                {renderDifficultyField()}
                {renderTypeField()}

                <MTButton $isPrimary type='submit' onClick={() => {}}>
                    {QUESTIONS_PAGE_STRINGS.SUBMIT_BUTTON_LABEL}
                </MTButton>
            </QuestionsSearchForm>
            {renderQuestions()}
        </QuestionsContainer>
    )
}
