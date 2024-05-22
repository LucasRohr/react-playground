import { APP_COLORS } from '@constants'
import styled from 'styled-components'

const CreateQuestionContainer = styled.section`
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 2em 2em 3em 4em;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: ${APP_COLORS.LIGHT_PRIMARY};
`

const CreateQuestionSearchForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 50%;
    margin-bottom: 60px;
`

const SelectCategoryContainer = styled.div`
    width: 100%;
    margin-top: 16px;
`

const SelectDifficultyContainer = styled.div`
    width: 100%;
    margin-top: 16px;
`

const SelectTypeContainer = styled(SelectDifficultyContainer)`
    margin-top: 24px;
    margin-bottom: 30px;
`

const AnswersContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
`

const Answerslabel = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 12px;
`

const IncorrectAnswersContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const SubmitButtonWrapper = styled.div`
    width: 100%;
    margin-top: 30px;
`

export {
    CreateQuestionContainer,
    Title,
    CreateQuestionSearchForm,
    SelectCategoryContainer,
    SelectDifficultyContainer,
    SelectTypeContainer,
    AnswersContainer,
    Answerslabel,
    IncorrectAnswersContainer,
    SubmitButtonWrapper,
}
