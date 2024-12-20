import './App.css'
import Login from './components/auth/Login'
import { BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Signup from './components/auth/Signup'
import New from './New'
import FoodItem from './components/pages/FoodItem'
import FoodSearch from './components/pages/FoodSearch'

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
      element: <FoodItem />,
    },
    {
      path: "/search/:searchStr",
      element: <FoodSearch />,
    },
    {
      path: "/new",
      element: <New />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
