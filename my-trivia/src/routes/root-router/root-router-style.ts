import styled from 'styled-components'
import { APP_COLORS } from '@constants'

const StyledRouter = styled.section`
    height: 100vh;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 2em 2.5em 0em 2.5em;
    background-color: ${APP_COLORS.LIGHT_BLACK};
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: ${APP_COLORS.LIGHT_PRIMARY};
    margin-bottom: 2em;
`

export { StyledRouter, Title }
