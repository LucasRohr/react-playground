import { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { PAGES } from '@constants'

import { ROOT_ROUTER_STRINGS } from './root-router-strings'
import {
    StyledRouter,
    MenuSection,
    Title,
    RouterButton,
    ScorePrefixText,
    ScoreText,
} from './root-router-style'

export function RootRouter() {
    const [selectedPage, setSelectedPage] = useState(PAGES.HOME.KEY)

    const navigate = useNavigate()

    useEffect(() => {
        navigate(PAGES.HOME.ROUTE_PATH)
    }, [navigate])

    const renderButton = useCallback(
        (page: string) => {
            const isSelectedPage = page === selectedPage
            const pageData = PAGES[page as keyof typeof PAGES]

            const onClickButton = () => {
                setSelectedPage(pageData.KEY)
                navigate(pageData.ROUTE_PATH)
            }

            return (
                <RouterButton isPrimary={isSelectedPage} onClick={onClickButton}>
                    {pageData.LABEL}
                </RouterButton>
            )
        },
        [selectedPage, navigate]
    )

    return (
        <StyledRouter>
            <MenuSection>
                <Title>{ROOT_ROUTER_STRINGS.APP_NAME}</Title>
                <ScorePrefixText>
                    {ROOT_ROUTER_STRINGS.SCORE_LABEL}
                    <ScoreText>0</ScoreText>
                </ScorePrefixText>
                {renderButton(PAGES.HOME.KEY)}
                {renderButton(PAGES.QUESTIONS.KEY)}
                {renderButton(PAGES.CREATE.KEY)}
                {renderButton(PAGES.HISTORY.KEY)}
            </MenuSection>
            <Outlet />
        </StyledRouter>
    )
}
