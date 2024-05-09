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
    const { category, question, difficulty, score, correctAnswer, incorrectAnswers, userAnswer } =
        props

    const setScore = useSetAtom(scoreAtom)
    const [homeQuestions, setHomeQuestions] = useAtom(homeQuestionsAtom)
    const [historyQuestions, setHistoryQuestions] = useAtom(historyQuestionsAtom)

    const onPressAnswer = (answer: string) => {
        const isCorrectAnswer = answer === correctAnswer
        const questionIndex = homeQuestions.questions.findIndex(
            (question) => question.correctAnswer === correctAnswer
        )
        const homeQuestionsCopy = { ...homeQuestions }
        const updatedQuestion = {
            ...homeQuestionsCopy.questions[questionIndex],
            userAnswer: answer,
        }
        const hasHistory = historyQuestions[0].category !== ''

        if (hasHistory) {
            setHistoryQuestions((prevHistory) => [...prevHistory, updatedQuestion])
        } else {
            setHistoryQuestions([updatedQuestion])
        }

        homeQuestionsCopy.questions[questionIndex] = updatedQuestion
        setHomeQuestions(homeQuestionsCopy)

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
