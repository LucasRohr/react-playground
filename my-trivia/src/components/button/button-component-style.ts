import styled from 'styled-components'

const StyledButton = styled.button<{ isPrimary: boolean }>`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => (props.isPrimary ? props.theme.WHITE : props.theme.LIGHT_BLACK)};
    background-color: ${(props) =>
        props.isPrimary ? props.theme.DARK_PRIMARY : props.theme.LIGHT_PRIMARY};
    padding: 0.6em 1.5em 0.5em 1.5em;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        opacity: 0.6;
    }
`

export { StyledButton }
