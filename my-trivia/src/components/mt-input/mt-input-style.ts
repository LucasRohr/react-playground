import styled from 'styled-components'

import { APP_COLORS } from '@constants'

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`

const InputErrorText = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: ${APP_COLORS.ERROR};
`

export { InputContainer, InputErrorText }
