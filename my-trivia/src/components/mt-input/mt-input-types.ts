import { UseFormRegisterReturn } from 'react-hook-form'

export interface MTInputPropsInterface<InputName extends string> {
    id: string
    label: string
    registerData: UseFormRegisterReturn<InputName>
    type?: string
    error?: string
    fullWidth?: boolean
}
