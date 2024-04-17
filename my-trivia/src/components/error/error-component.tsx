import { useNavigate, useRouteError } from 'react-router-dom'

import { StyledError, Subtitle, Title, ErrorMessage, BackButton } from './error-component-style'
import { ERROR_COMPONENT_STRINGS } from './error-component-strings'

interface RouteError {
    statusText: string
    message: string
}

export function ErrorComponent() {
    const error = useRouteError() as RouteError
    const navigate = useNavigate()

    const errorMessage = error.statusText || error.message

    return (
        <StyledError>
            <Title>{ERROR_COMPONENT_STRINGS.TITLE}</Title>
            <Subtitle>{ERROR_COMPONENT_STRINGS.SUBTITLE}</Subtitle>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <BackButton onClick={() => navigate('/')}>
                {ERROR_COMPONENT_STRINGS.BACK_BUTTON_LABEL}
            </BackButton>
        </StyledError>
    )
}
