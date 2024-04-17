import styled from 'styled-components'
import { APP_COLORS } from '../../constants'

const StyledError = styled.section`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 3em;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: ${APP_COLORS.ERROR};
`

const Subtitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    color: ${APP_COLORS.WHITE};
    margin-bottom: 1em;
`

const ErrorMessage = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: ${APP_COLORS.ERROR};
    margin-bottom: 3em;
`

const BackButton = styled.button`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    color: ${APP_COLORS.LIGHT_BLACK};
    background-color: ${APP_COLORS.LIGHT_PRIMARY};
    padding: 0.6em 1.5em 0.5em 1.5em;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        opacity: 0.6;
    }
`

export { StyledError, Title, Subtitle, ErrorMessage, BackButton }
