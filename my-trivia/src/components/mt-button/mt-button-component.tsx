import { StyledButton } from './mt-button-component-style'
import { ButtonComponentProp } from './mt-button-component-types'

export function MTButton(props: ButtonComponentProp) {
    return <StyledButton type={props.type} {...props} />
}
