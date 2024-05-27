import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ location, heroData }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchHeroList, setSearchHeroList] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/search/${searchValue}`,
    )
      .then(res => res.json())
      .then((data) => {
        setSearchHeroList(data.results)
      })
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
      <Link to="/" className="logo">HeroApp</Link>
      {location !== '/'
        ? (
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              className="border-2 border-gray-200 mr-2"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <button type="button">Search</button>
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
