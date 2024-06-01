import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

export default function HomePage() {
  const [searchData, setSearchData] = useState('')
  const [heroList, setHeroList] = useState()
  const [loading, setLoading] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const [selectedHeroData, setSelectedHeroData, favorites, setFavorites] = useOutletContext()

  const navigate = useNavigate()

  const fetchHeroes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/search/${searchData}`,
      )
      if (!res.ok)
        throw new Error('Seems like there\'s is an error while trying to get the data')
      const data = await res.json()
      if (data.response === 'success')
        setHeroList(data.results)
      else setErrorMsg(data.error)
      if (data)
        setLoading(false)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setSearchData('')
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchHeroes()
      setLoading(true)
    }
  }

  const handleSelectedHero = (e) => {
    const selectedHeroId = e.currentTarget.id
    if (selectedHeroId) {
      const selectedHero = heroList.filter(hero => hero.id === selectedHeroId)
      setSelectedHeroData(selectedHero)
      localStorage.setItem('hero', JSON.stringify(selectedHero))
      navigate(`/hero/${selectedHeroId}`)
    }
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center pt-4">
        <div className="flex items-center bg-white rounded-lg px-2 py-1">
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
          <input
            type="text"
            value={searchData}
            onChange={e => setSearchData(e.target.value)}
            className="rounded-l-lg p-1 w-[25%] max-w-[24rem] min-w-[20rem] h-full outline-none text-md"
            onKeyDown={e => handleSearch(e)}
            placeholder="Enter a hero name..."
          />
          <span className="text-gray-500">Enter</span>
        </div>
      </div>
      <div className="mt-14 py-12 max-w-[800px] mx-auto">
        <ul className="sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-12">
          { loading
            ? 'Loading'
            : !errorMsg
                ? heroList?.map(hero => (
                  <li key={hero?.id}>
                    <div className="flex mb-4 sm:mb-0 border-2 rounded-md p-2 min-h-[16rem] max-h-[16rem] w-[12rem] relative" style={{ background: `url(${hero?.image?.url}) center/cover` }} role="presentation" id={hero?.id} onClick={e => handleSelectedHero(e)}>
                      <div className="self-end">
                        <h3 className="text-white">{hero?.name}</h3>
                        <p className="text-white">{hero?.biography['full-name']}</p>
                      </div>
                    </div>
                  </li>
                ))
                : <h1>{errorMsg}</h1>}
        </ul>
      </div>
    </div>
  )
}
