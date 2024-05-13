import { StyledButton } from './button-component-style'
import { ButtonComponentProp } from './button-component-types'

export function Button(props: ButtonComponentProp) {
    return <StyledButton type={props.type} {...props} />
}
