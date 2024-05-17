import { useAtom, useSetAtom } from 'jotai'

import { SCORES } from '@constants'
import { shuffleArray } from '@utils'
import { historyQuestionsAtom, homeQuestionsAtom, scoreAtom } from '@store'

import { QUESTION_CARD_COMPONENT_STRINGS } from './question-card-component-strings'
import {
    AnswerButton,
    AnswerButtonsContainer,
    AnswerButtonText,
    AnswerMessage,
    AnswerMessageHighlight,
    CardHeader,
    CategoryLabel,
    CategoryName,
    CorrectAnswerContainer,
    DifficultyContainer,
    DifficultyDiamondEmpty,
    DifficultyDiamondFilled,
    DifficultyLabel,
    IncorrectAnswerContainer,
    QuestionCard,
    QuestionText,
} from './question-card-component-style'
import { QuestionCardComponentPropTypes } from './question-card-component-types'

export function QuestionCardComponent(props: QuestionCardComponentPropTypes) {
    const {
        category,
        question,
        difficulty,
        score,
        correctAnswer,
        incorrectAnswers,
        userAnswer,
        questionsAtom,
    } = props

    const setScore = useSetAtom(scoreAtom)
    const [questions, setQuestions] = useAtom(questionsAtom ?? homeQuestionsAtom)
    const [historyQuestions, setHistoryQuestions] = useAtom(historyQuestionsAtom)

    const onPressAnswer = (answer: string) => {
        const isCorrectAnswer = answer === correctAnswer
        const hasHistory = historyQuestions.length > 0

        const questionIndex = questions.questions.findIndex(
            (question) => question.correctAnswer === correctAnswer
        )

        const questionsCopy = { ...questions }

        const updatedQuestion = {
            ...questionsCopy.questions[questionIndex],
            userAnswer: answer,
        }

        if (hasHistory) {
            setHistoryQuestions((prevHistory) => [...prevHistory, updatedQuestion])
        } else {
            setHistoryQuestions([updatedQuestion])
        }

        questionsCopy.questions[questionIndex] = updatedQuestion
        setQuestions(questionsCopy)

        if (isCorrectAnswer) {
            setScore((prevScore) => prevScore + score)
        }
    }

    const renderDifficultyDiamonds = () => {
        const difficultyScores = Object.values(SCORES)

        return difficultyScores.map((score, index) => {
            const isFilledDiamond = score <= SCORES[difficulty as keyof typeof SCORES]

            return isFilledDiamond ? (
                <DifficultyDiamondFilled key={index} />
            ) : (
                <DifficultyDiamondEmpty key={index} />
            )
        })
    }

    const renderAnswersButtons = () => {
        const allAnswers = [...incorrectAnswers, correctAnswer]
        shuffleArray(allAnswers)

        return allAnswers.map((answer, index) => (
            <AnswerButton key={index} $isPrimary onClick={() => onPressAnswer(answer)}>
                <AnswerButtonText>{answer}</AnswerButtonText>
            </AnswerButton>
        ))
    }

    const renderUserAnswer = () => {
        const isCorrectAnswer = userAnswer === correctAnswer

        if (isCorrectAnswer) {
            const answerHighlightText =
                QUESTION_CARD_COMPONENT_STRINGS.CORRECT_ANSWER_MESSAGE_PLUS.concat(score.toString())

            return (
                <CorrectAnswerContainer>
                    <AnswerMessage>
                        {QUESTION_CARD_COMPONENT_STRINGS.CORRECT_ANSWER_MESSAGE}

                        <AnswerMessageHighlight>{answerHighlightText}</AnswerMessageHighlight>
                    </AnswerMessage>
                </CorrectAnswerContainer>
            )
        }

        return (
            <IncorrectAnswerContainer>
                <AnswerMessage>
                    {QUESTION_CARD_COMPONENT_STRINGS.INCORRECT_ANSWER_MESSAGE}

                    <AnswerMessageHighlight>{correctAnswer}</AnswerMessageHighlight>
                </AnswerMessage>
            </IncorrectAnswerContainer>
        )
    }

    const renderAnswerContent = () => {
        if (userAnswer) {
            return renderUserAnswer()
        }

        return <AnswerButtonsContainer>{renderAnswersButtons()}</AnswerButtonsContainer>
    }

    return (
        <QuestionCard>
            <CardHeader>
                <CategoryLabel>
                    {QUESTION_CARD_COMPONENT_STRINGS.CATEGORY_LABEL}
                    <CategoryName>{category}</CategoryName>
                </CategoryLabel>

                <DifficultyContainer>
                    <DifficultyLabel>
                        {QUESTION_CARD_COMPONENT_STRINGS.DIFFICULTY_LABEL}
                    </DifficultyLabel>

                    {renderDifficultyDiamonds()}
                </DifficultyContainer>
            </CardHeader>

            <QuestionText>{question}</QuestionText>

            {renderAnswerContent()}
        </QuestionCard>
    )
}
