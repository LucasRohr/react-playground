import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootRouter } from '@routes'
import { ErrorComponent } from '@components'

import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRouter />,
        errorElement: <ErrorComponent />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
