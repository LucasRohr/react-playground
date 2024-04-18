import { ROOT_ROUTER_STRINGS } from './root-router-strings'
import { StyledRouter, Title } from './root-router-style'

export function RootRouter() {
    return (
        <>
            <StyledRouter>
                <Title>{ROOT_ROUTER_STRINGS.APP_NAME}</Title>
            </StyledRouter>
        </>
    )
}
