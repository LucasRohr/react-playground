import styled from 'styled-components'

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
    color: ${(props) => props.theme.ERROR};
`

const Subtitle = styled.p`
    font-size: 24px;
    font-weight: 500;
    color: ${(props) => props.theme.WHITE};
    margin-bottom: 1em;
`

const ErrorMessage = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.ERROR};
    margin-bottom: 3em;
`

export { StyledError, Title, Subtitle, ErrorMessage }
