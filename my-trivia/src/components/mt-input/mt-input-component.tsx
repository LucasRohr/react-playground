import { TextField } from '@mui/material'

import { APP_COLORS } from '@constants'

import { InputContainer, InputErrorText } from './mt-input-style'
import { MTInputPropsInterface } from './mt-input-types'

export function MTInput<InputName extends string>(props: MTInputPropsInterface<InputName>) {
    const { id, label, registerData, error, type, fullWidth } = props

    const renderError = (message?: string) => {
        if (!message) {
            return null
        }

        return <InputErrorText>{message}</InputErrorText>
    }

    return (
        <InputContainer>
            <TextField
                id={id}
                label={label}
                type={type ?? 'text'}
                variant='filled'
                margin='normal'
                fullWidth={fullWidth}
                style={{
                    caretColor: APP_COLORS.LIGHT_PRIMARY,
                    color: APP_COLORS.LIGHT_PRIMARY,
                }}
                {...registerData}
            />
            {renderError(error)}
        </InputContainer>
    )
}
