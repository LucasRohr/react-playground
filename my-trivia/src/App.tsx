import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { router } from '@routes'
import { APP_COLORS } from '@constants'

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={APP_COLORS}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
