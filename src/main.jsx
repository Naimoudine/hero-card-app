import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import HeroPage from './pages/HeroPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

function getLocalStorageData() {
  const localHero = JSON.parse(localStorage.getItem('hero'))
  return localHero
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/hero/:id',
        element: <HeroPage />,
        loader: getLocalStorageData,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
