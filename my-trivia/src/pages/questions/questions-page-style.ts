import { APP_COLORS } from '@constants'
import styled from 'styled-components'

const QuestionsContainer = styled.section`
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

const QuestionsSearchForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 40%;
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

export {
    QuestionsContainer,
    Title,
    QuestionsSearchForm,
    SelectCategoryContainer,
    SelectDifficultyContainer,
    SelectTypeContainer,
}
