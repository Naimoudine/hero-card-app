import { useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import SearchItem from './SearchItem'

export default function SearchBarModal() {
  const [searchValue, setSearchValue] = useState('')
  const [heroList, setHeroList] = useState()
  const [loading, setLoading] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const context = useOutletContext()
  const location = useLocation()

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

  const onSearch = (e) => {
    if (e.key === 'Enter')
      fetchHeroes()
  }

  return (
    <div className={location.pathname === '/search' ? `absolute w-screen h-screen bg-black/50` : `hidden`}>
      <div className="flex flex-col items-center pt-32">
        <div className=" flex-col w-[50%]">
          <div className={heroList ? `flex items-center justify-between bg-white rounded-t-lg px-4 py-4` : `flex items-center justify-between bg-white rounded-lg px-4 py-4`}>
            <div className="flex items-center w-[85%]">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
              <input
                type="text"
                className=" p-1 h-full outline-none text-md w-[100%] bg-red-100"
                placeholder="Please enter a hero name"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => onSearch(e)}
              />
            </div>
            <span className="text-gray-500">Enter</span>
          </div>
          <div className="w-full bg-white rounded-b-lg max-h-[400px] overflow-scroll">
            {heroList?.map(hero => <SearchItem key={hero?.id} data={hero} selected={context?.setSelectedHeroData} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
