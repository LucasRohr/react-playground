import styled from 'styled-components'
import { APP_COLORS } from '@constants'

const HomeContainer = styled.section`
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

export { HomeContainer, Title }
