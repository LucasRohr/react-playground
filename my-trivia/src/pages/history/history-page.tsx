import { useAtomValue } from 'jotai'

import { historyQuestionsAtom } from '@store'

import { HISTORY_PAGE_STRINGS } from './history-page-strings'
import { HistoryContainer, Title, WithoutAnswersMessage } from './history-page-style'
import { useCallback } from 'react'
import { QuestionCardComponent } from '@components'

export function HistoryPage() {
    const historyQuestions = useAtomValue(historyQuestionsAtom)

    const renderQuestions = useCallback(() => {
        const hasAnswers = historyQuestions.length

        if (!hasAnswers) {
            return (
                <>
                    <WithoutAnswersMessage>
                        {HISTORY_PAGE_STRINGS.WITHOUT_ANSWERS_MESSAGE_FIRST_PART}
                        <br />
                        {HISTORY_PAGE_STRINGS.WITHOUT_ANSWERS_MESSAGE_SECOND_PART}
                    </WithoutAnswersMessage>
                </>
            )
        }

        return historyQuestions.map((question, index) => (
            <QuestionCardComponent key={index} {...question} />
        ))
    }, [historyQuestions])

    return (
        <HistoryContainer>
            <Title>{HISTORY_PAGE_STRINGS.TITLE}</Title>

            {renderQuestions()}
        </HistoryContainer>
    )
}
