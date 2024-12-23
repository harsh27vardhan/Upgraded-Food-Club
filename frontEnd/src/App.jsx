import './App.css'
import Login from './components/auth/Login'
import { BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from './components/auth/Signup'
import New from './New'
import FoodItem from './components/pages/FoodItem'
import FoodSearch from './components/pages/FoodSearch'
import Cart from './components/pages/Cart'
import Header from './Header'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/foodItem/:foodId",
      element: <>
        <Header />
        <FoodItem />,
      </>
    },
    {
      path: "/search/:searchStr",
      element: <>
        <Header />
        <FoodSearch />,
      </>
    },
    {
      path: "/new",
      element: <New />
    },
    {
      path: "/cart",
      element: <>
        <Header />
        <Cart />
      </>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
