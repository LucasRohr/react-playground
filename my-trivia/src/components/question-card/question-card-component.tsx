import { SCORES } from '@constants'
import { shuffleArray } from '@utils'

import { QUESTION_CARD_COMPONENT_STRINGS } from './question-card-component-strings'
import {
    AnswerButton,
    AnswerButtonsContainer,
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

    const renderDifficultyDiamonds = () => {
        const difficultyScores = Object.values(SCORES)

        return difficultyScores.map((score) => {
            const isFilledDiamond = score <= SCORES[difficulty as keyof typeof SCORES]

            return isFilledDiamond ? <DifficultyDiamondFilled /> : <DifficultyDiamondEmpty />
        })
    }

    const renderAnswersButtons = () => {
        const allAnswers = [...incorrectAnswers, correctAnswer]
        shuffleArray(allAnswers)

        return allAnswers.map((answer) => (
            <AnswerButton $isPrimary onClick={() => alert(score)}>
                {answer}
            </AnswerButton>
        ))
    }

    const renderUserAnswer = () => {
        const isCorrectAnswer = userAnswer === correctAnswer

        if (isCorrectAnswer) {
            const answerHighlightText =
                QUESTION_CARD_COMPONENT_STRINGS.CORRECT_ANSWER_MESSAGE_PLUS.concat(userAnswer)

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
