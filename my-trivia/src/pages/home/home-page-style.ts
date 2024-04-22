import styled from 'styled-components'
import { APP_COLORS } from '@constants'

const HomeContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    scroll-behavior: smooth;
    padding: 2em 2em 3em 4em;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: ${APP_COLORS.LIGHT_PRIMARY};
`

export { HomeContainer, Title }
