import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import SearchBarModal from './components/SearchBarModal'

function App() {
  const [selectedHeroData, setSelectedHeroData] = useState()
  const [favorites, setFavorites] = useState([])
  const [collection, setCollection] = useState([])
  const [modal, setModal] = useState(false)

  return (
    <>
      <main className="relative h-full w-full flex">
        <SearchBarModal modal={modal} setModal={setModal} setSelectedHeroData={setSelectedHeroData} />
        <aside>
          <NavBar />
        </aside>
        <div className="w-full flex flex-col pt-4">
          <div className="bg-white flex items-center w-fit px-4 py-2 rounded-lg self-center">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
            <button className="bg-white w-[90%] text-start" onClick={() => setModal(true)}>
              Search for a hero...
            </button>
            <span className="text-gray-400">Enter</span>
          </div>
          <Outlet context={{ selectedHeroData, setSelectedHeroData, favorites, setFavorites, collection, setCollection }} />
        </div>
      </main>
    </>
  )
}

export default App
