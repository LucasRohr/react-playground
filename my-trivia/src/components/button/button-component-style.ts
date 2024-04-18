import styled from 'styled-components'
import { APP_COLORS } from '@constants'

const StyledButton = styled.button<{ isPrimary: boolean }>`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => (props.isPrimary ? APP_COLORS.WHITE : APP_COLORS.LIGHT_BLACK)};
    background-color: ${(props) =>
        props.isPrimary ? APP_COLORS.DARK_PRIMARY : APP_COLORS.LIGHT_PRIMARY};
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
