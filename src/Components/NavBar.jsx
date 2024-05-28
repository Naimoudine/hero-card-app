import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ location, heroData }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchHeroList, setSearchHeroList] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/search/${searchValue}`,
      )
        .then((res) => {
          if (!res.ok)
            throw new Error('Seems like there\'s is an error while trying to get the data')
          return res.json()
        })
        .then((data) => {
          if (data.response === 'success')
            setSearchHeroList(data.results)
        })
    }
    catch (error) {
      console.error(error)
    }
  }, [searchValue])

  const handleSelectedHero = (e) => {
    const selectedHeroId = e.currentTarget.id
    if (selectedHeroId) {
      const selectedHero = searchHeroList.filter(hero => hero.id === selectedHeroId)
      heroData(selectedHero)
    }
    navigate(`/hero/${selectedHeroId}`)
    setSearchValue('')
  }

  return (
    <nav className="h-[10dvh] flex items-center justify-between px-4">
      <Link to="/" className="logo">MyHeroCard</Link>
      {location !== '/'
        ? (
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              className="rounded-md mr-2 text-sm p-1.5"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Enter hero name"
            />
            <div className="flex flex-col w-full bg-gray-200 absolute left-0 max-h-[150px] overflow-scroll">
              {searchHeroList?.map(hero => (
                <div key={hero?.id} className="searchLink" onClick={e => handleSelectedHero(e)} id={hero?.id}>
                  <img src={hero?.image.url} alt="" className="h-[25px] w-[25px] bg-red-200 mr-2" />
                  <p>{hero?.name}</p>
                </div>
              ))}

            </div>
          </div>

          )
        : ''}
    </nav>
  )
}
