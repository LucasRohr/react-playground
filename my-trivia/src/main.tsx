import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootRouter } from './routes'
import { ErrorComponent } from './components'

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