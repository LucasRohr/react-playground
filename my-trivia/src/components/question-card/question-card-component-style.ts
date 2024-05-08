import styled from 'styled-components'
import { StyledButton } from '@components/button/button-component-style'

const QuestionCard = styled.div`
    width: 75%;
    max-width: 75%;
    min-width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    padding: 1.5em;
    border-radius: 4px;
    background-color: ${(props) => props.theme.LIGHT_BLACK};
    margin-bottom: 2em;
`

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1.5em;
`

const CategoryLabel = styled.span`
    font-size: 20px;
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
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    padding-right: 0.8em;
`

const DifficultyDiamondFilled = styled.div`
    width: 14px;
    height: 14px;
    rotate: 45deg;
    margin-right: 0.6em;
    background-color: ${(props) => props.theme.DARK_PRIMARY};
`

const DifficultyDiamondEmpty = styled(DifficultyDiamondFilled)`
    background-color: ${(props) => props.theme.WHITE};
`

const QuestionText = styled.span`
    font-size: 22px;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    text-align: left;
    margin-bottom: 1.5em;
`

const AnswerButtonsContainer = styled.div`
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.5em;
`

const AnswerButton = styled(StyledButton)`
    width: 100%;
    height: 40px;
    margin-bottom: 14px;
`

const AnswerButtonText = styled.span`
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
`

const CorrectAnswerContainer = styled.div`
    width: 100%;
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
    background-color: transparent;
    font-size: 28px;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_BLACK};
`

const AnswerMessageHighlight = styled(AnswerMessage)`
    color: ${(props) => props.theme.WHITE};
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
    AnswerButtonText,
    CorrectAnswerContainer,
    IncorrectAnswerContainer,
    AnswerMessage,
    AnswerMessageHighlight,
}
