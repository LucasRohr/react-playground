import { ReactNode } from 'react'

export interface ButtonComponentProp {
    $isPrimary: boolean
    onClick: () => void
    children?: string | ReactNode
    type?: 'button' | 'reset' | 'submit' | undefined
}
