import { createBrowserRouter } from 'react-router-dom'

import { ErrorComponent } from '@components'
import { CreateQuestionPage, HistoryPage, HomePage, QuestionsPage } from '@pages'

import { RootRouter } from '../root-router/root-router-component'
import { PAGES } from '@constants'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRouter />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: PAGES.HOME.ROUTE_PATH,
                element: <HomePage />,
            },
            {
                path: PAGES.QUESTIONS.ROUTE_PATH,
                element: <QuestionsPage />,
            },
            {
                path: PAGES.CREATE.ROUTE_PATH,
                element: <CreateQuestionPage />,
            },
            {
                path: PAGES.HISTORY.ROUTE_PATH,
                element: <HistoryPage />,
            },
        ],
    },
])

export { router }
