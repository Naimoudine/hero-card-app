import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'

function App() {
  const [selectedHeroData, setSelectedHeroData] = useState()
  const [favorites, setFavorites] = useState([])
  const [collection, setCollection] = useState([])

  return (
    <>
      <main className="h-full w-full flex">
        <aside>
          <NavBar />
        </aside>
        <div className="w-full">
          <Outlet context={[selectedHeroData, setSelectedHeroData, favorites, setFavorites, collection, setCollection]} />
        </div>
      </main>
    </>
  )
}

export default App
