import { Provider as StoreProvider } from 'jotai'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { createTheme, THEME_ID } from '@mui/material'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { router } from '@routes'
import { APP_COLORS } from '@constants'
import { store } from '@store'

const queryClient = new QueryClient()

const materialTheme = createTheme({
    palette: {
        primary: {
            main: APP_COLORS.LIGHT_PRIMARY,
            light: APP_COLORS.LIGHT_PRIMARY,
            dark: APP_COLORS.DARK_PRIMARY,
        },
        secondary: {
            main: APP_COLORS.LIGHT_BLACK,
            light: APP_COLORS.LIGHT_BLACK,
            dark: APP_COLORS.DARK_BLACK,
        },
        text: {
            primary: APP_COLORS.LIGHT_PRIMARY,
            secondary: APP_COLORS.DARK_PRIMARY,
        },
        background: {
            default: APP_COLORS.LIGHT_PRIMARY,
        },
    },
})

export function App() {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={APP_COLORS}>
                    <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
                        <RouterProvider router={router} />
                    </MaterialThemeProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </StoreProvider>
    )
}
