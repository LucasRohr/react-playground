import React from 'react'
import { MainTitleProps } from './types'

import './MainTitle.scss'

const MainTitle = (props: MainTitleProps) => {
    const { title } = props

    return (
        <div className='main-title-container'>
            <h1>{title}</h1>
        </div>
    )
}

export { MainTitle }
