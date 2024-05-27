import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

export default function HomePage() {
  const [searchData, setSearchData] = useState('')
  const [heroList, setHeroList] = useState()
  const [loading, setLoading] = useState()

  const [heroData, setHeroData, setLocation] = useOutletContext()

  const navigate = useNavigate()
  const location = useLocation()

  const fetchHeroes = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/search/${searchData}`,
    )
    const data = await res.json()
    setHeroList(data.results)
    setSearchData('')
    if (data)
      setLoading(false)
  }

  const handleSearch = () => {
    fetchHeroes()
    setLoading(true)
  }

  useEffect(() => {
    setLocation(location.pathname.slice(0, 6))
  }, [location])

  const handleSelectedHero = (e) => {
    const selectedHeroId = e.currentTarget.id
    if (selectedHeroId) {
      const selectedHero = heroList.filter(hero => hero.id === selectedHeroId)
      setHeroData(selectedHero)
    }
    navigate(`/hero/${selectedHeroId}`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pt-20 text-center">
        <input
          type="text"
          value={searchData}
          onChange={e => setSearchData(e.target.value)}
          className="border-2 border-gray-500 rounded-md mr-4 p-1 w-[25%] max-w-[24rem] min-w-[20rem]"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="mt-14 py-12 max-w-[800px] mx-auto">
        <ul className="sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-12">
          { loading
            ? 'Loading'
            : heroList
              ? heroList?.map(hero => (
                <li key={hero?.id}>
                  <div className="flex mb-4 sm:mb-0 border-2 rounded-md p-2 min-h-[16rem] max-h-[16rem] w-[12rem]" style={{ background: `url(${hero?.image?.url}) center/cover` }} role="presentation" id={hero?.id} onClick={e => handleSelectedHero(e)}>
                    <div className="self-end">
                      <h3 className="text-white">{hero?.name}</h3>
                      <p className="text-white">{hero?.biography['full-name']}</p>
                    </div>
                  </div>
                </li>
              ))
              : 'No hero found, please search for a new one'}
        </ul>
      </div>
    </div>
  )
}
