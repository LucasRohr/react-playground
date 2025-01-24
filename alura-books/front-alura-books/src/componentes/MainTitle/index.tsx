import React from 'react'
import { MainTitlePropsInterface } from './PropsInterface'

import './MainTitle.scss'

function MainTitle(props: MainTitlePropsInterface) {
    const { title } = props

    return (
        <div className='main-title-container'>
            <h1>{title}</h1>
        </div>
    )
}

export { MainTitle }
