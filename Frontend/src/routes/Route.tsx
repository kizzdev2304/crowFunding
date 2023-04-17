import { createBrowserRouter } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from '../Layout/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    )
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    )
  },
  {
    path: '*',
    element: <>404</>
  }
])
