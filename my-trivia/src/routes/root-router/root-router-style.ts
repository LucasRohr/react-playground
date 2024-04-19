import styled from 'styled-components'
import { ComponentStyles } from '@components'

const StyledRouter = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    background-color: ${(props) => props.theme.DARK_BLACK};
`

const MenuSection = styled.section`
    height: 100vh;
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 2em 2.5em 0em 2.5em;
    background-color: ${(props) => props.theme.LIGHT_BLACK};
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    margin-bottom: 1em;
`

const ScorePrefixText = styled.span`
    font-size: 26px;
    font-weight: bold;
    color: ${(props) => props.theme.LIGHT_PRIMARY};
    margin-bottom: 2em;
`

const ScoreText = styled.span`
    font-size: 26px;
    font-weight: bold;
    color: ${(props) => props.theme.WHITE};
    margin-bottom: 2em;
`

const RouterButton = styled(ComponentStyles.StyledButton)`
    margin-bottom: 1em;
`

export { StyledRouter, MenuSection, Title, ScorePrefixText, ScoreText, RouterButton }
