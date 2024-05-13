import { useForm } from 'react-hook-form'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import { APP_COLORS, QUESTIONS_FILTERS } from '@constants'
import { Button } from '@components'

import { QUESTIONS_PAGE_STRINGS } from './questions-page-strings'
import {
    QuestionsContainer,
    QuestionsSearchForm,
    SelectDifficultyContainer,
    SelectTypeContainer,
    Title,
} from './questions-page-style'

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

const QUESTION_FILTER_LABELS = Object.freeze({
    DIFFICULTY: {
        EASY: 'Easy',
        MEDIUM: 'Medium',
        HARD: 'Hard',
    },
    TYPE: {
        MULTIPLE: 'Multiple choice',
        BOOLEAN: 'True/False',
    },
})

const INPUT_IDS = {
    QUANTITY: 'questions-search-quantity',
    CATEGORY: 'questions-search-category',
    DIFFICULTY: 'questions-search-difficulty',
    TYPE: 'questions-search-type',
}

const QUANTITY_INPUT_MAX_VALUE = 30

export function QuestionsPage() {
    const { register, handleSubmit } = useForm<QuestionsSearchFormInterface>({
        defaultValues: FORM_DEFAULT_VALUES,
    })

    return (
        <QuestionsContainer>
            <Title>{QUESTIONS_PAGE_STRINGS.TITLE}</Title>

            <QuestionsSearchForm
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                })}
            >
                <TextField
                    id={INPUT_IDS.QUANTITY}
                    label={QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_LABEL}
                    type='number'
                    variant='filled'
                    margin='normal'
                    style={{
                        caretColor: APP_COLORS.LIGHT_PRIMARY,
                        color: APP_COLORS.LIGHT_PRIMARY,
                    }}
                    {...register('quantity', {
                        required: QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_REQUIRED,
                        max: {
                            value: QUANTITY_INPUT_MAX_VALUE,
                            message: QUESTIONS_PAGE_STRINGS.QUANTITY_INPUT_MAX,
                        },
                    })}
                />
                <TextField
                    fullWidth
                    id={INPUT_IDS.CATEGORY}
                    label={QUESTIONS_PAGE_STRINGS.CATEGORY_INPUT_LABEL}
                    type='text'
                    variant='filled'
                    margin='normal'
                    style={{
                        caretColor: APP_COLORS.LIGHT_PRIMARY,
                        color: APP_COLORS.LIGHT_PRIMARY,
                    }}
                    {...register('category', {
                        required: QUESTIONS_PAGE_STRINGS.CATEGORY_INPUT_REQUIRED,
                        maxLength: {
                            value: QUANTITY_INPUT_MAX_VALUE,
                            message: QUESTIONS_PAGE_STRINGS.CATEGORY_INPUT_MAX,
                        },
                    })}
                />
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
                            {...register('difficulty', { required: true })}
                        >
                            <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.EASY}>
                                {QUESTION_FILTER_LABELS.DIFFICULTY.EASY}
                            </MenuItem>
                            <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.MEDIUM}>
                                {QUESTION_FILTER_LABELS.DIFFICULTY.MEDIUM}
                            </MenuItem>
                            <MenuItem value={QUESTIONS_FILTERS.DIFFICULTY.HARD}>
                                {QUESTION_FILTER_LABELS.DIFFICULTY.HARD}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </SelectDifficultyContainer>
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
                            {...register('type', { required: true })}
                        >
                            <MenuItem value={QUESTIONS_FILTERS.TYPE.MULTIPLE}>
                                {QUESTION_FILTER_LABELS.TYPE.MULTIPLE}
                            </MenuItem>
                            <MenuItem value={QUESTIONS_FILTERS.TYPE.BOOLEAN}>
                                {QUESTION_FILTER_LABELS.TYPE.BOOLEAN}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </SelectTypeContainer>
                <Button $isPrimary type='submit' onClick={() => {}}>
                    {QUESTIONS_PAGE_STRINGS.SUBMIT_BUTTON_LABEL}
                </Button>
            </QuestionsSearchForm>
        </QuestionsContainer>
    )
}
