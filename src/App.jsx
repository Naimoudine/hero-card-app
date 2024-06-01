import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const [selectedHeroData, setSelectedHeroData] = useState([])
  const [favorites, setFavorites] = useState([])
  const [collection, setCollection] = useState([])

  const navigate = useNavigate()

  return (
    <>
      <main className="h-full w-full flex relative">
        <aside>
          <NavBar />
        </aside>
        <div className="w-full">
          <div className="flex justify-center pt-4">
            <div className="flex items-center bg-white rounded-lg px-2 py-1">
              <div className="flex items-center w-[25%] max-w-[24rem] min-w-[20rem]">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                <button
                  type="button"
                  className="rounded-l-lg p-1 h-full outline-none text-md"
                  onClick={() => navigate('/search')}
                >
                  Search for a hero
                </button>
              </div>
              <span className="text-gray-500">Enter</span>
            </div>
          </div>
          <Outlet context={{ selectedHeroData, setSelectedHeroData, favorites, setFavorites, collection, setCollection }} />
        </div>
      </main>
    </>
  )
}

export default App
