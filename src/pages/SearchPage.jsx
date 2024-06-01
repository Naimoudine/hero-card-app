import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('')
  const [heroList, setHeroList] = useState()
  const [loading, setLoading] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const { setSelectedHeroData } = useOutletContext()

  const navigate = useNavigate()

  const fetchHeroes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/search/${searchValue}`,
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
      setSearchValue('')
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
