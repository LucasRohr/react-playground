import { ComponentStyles } from '@components'
import styled from 'styled-components'

const QuestionCard = styled.div`
    width: 60%;
    max-width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    padding: 1.5em;
    border-radius: 4px;
    background-color: ${(props) => props.theme.LIGHT_BLACK};
`

const CardHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 2em;
`

const CategoryLabel = styled.span`
    font-size: 20;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
`

const CategoryName = styled(CategoryLabel)`
    color: ${(props) => props.theme.WHITE};
`

const DifficultyContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DifficultyLabel = styled.span`
    font-size: 22;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    padding-right: 0.5em;
`

const DifficultyDiamondFilled = styled.div`
    width: 14px;
    height: 14px;
    rotate: 45deg;
    padding-right: 0.4em;
    background-color: ${(props) => props.theme.DARK_PRIMARY};
`

const DifficultyDiamondEmpty = styled(DifficultyDiamondFilled)`
    background-color: ${(props) => props.theme.WHITE};
`

const QuestionText = styled.span`
    font-size: 22;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    text-align: left;
`

const AnswerButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const AnswerButton = styled(ComponentStyles.StyledButton)`
    font-size: 14px;
`

const CorrectAnswerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: ${(props) => props.theme.LIGHT_PRIMARY};
`

const IncorrectAnswerContainer = styled(CorrectAnswerContainer)`
    background-color: ${(props) => props.theme.ERROR};
`

const AnswerMessage = styled.span`
    font-size: 28px;
    font-weight: bold;
    background-color: ${(props) => props.theme.LIGHT_BLACK};
`

const AnswerMessageHighlight = styled(AnswerMessage)`
    background-color: ${(props) => props.theme.WHITE};
`

export {
    QuestionCard,
    CardHeader,
    CategoryLabel,
    CategoryName,
    DifficultyContainer,
    DifficultyLabel,
    DifficultyDiamondFilled,
    DifficultyDiamondEmpty,
    QuestionText,
    AnswerButtonsContainer,
    AnswerButton,
    CorrectAnswerContainer,
    IncorrectAnswerContainer,
    AnswerMessage,
    AnswerMessageHighlight,
}
