import styled from 'styled-components'
import { APP_COLORS } from '@constants'

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

export { StyledError, Title, Subtitle, ErrorMessage }
