import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
)
