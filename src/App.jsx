import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import bg from './assets/images/bg.jpg'
import NavBar from './Components/NavBar'

function App() {
  const [heroData, setHeroData] = useState()
  const [favorites, setFavorites] = useState([])
  const [collection, setCollection] = useState([])

  return (
    <>
      <main className="h-full w-full flex">
        <aside>
          <NavBar heroData={setHeroData} />
        </aside>
        <div className="w-full">
          <Outlet context={[heroData, setHeroData, favorites, setFavorites, collection, setCollection]} />
        </div>
      </main>
    </>
  )
}

export default App
