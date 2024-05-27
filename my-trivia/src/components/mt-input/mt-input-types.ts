import { UseFormRegisterReturn } from 'react-hook-form'

export interface MTInputPropsInterface<InputName extends string> {
    id: string
    registerData: UseFormRegisterReturn<InputName>
    label?: string
    type?: string
    error?: string
    fullWidth?: boolean
}
