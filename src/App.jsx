import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import bg from './assets/images/bg.jpg'
import NavBar from './Components/NavBar'

function App() {
  const [heroData, setHeroData] = useState()
  const [location, setLocation] = useState('')
  return (
    <>
      <header>
        <NavBar location={location} heroData={setHeroData} />
      </header>
      <main className="h-[90dvh]">
        <Outlet context={[heroData, setHeroData, setLocation]} />
      </main>
    </>
  )
}

export default App
