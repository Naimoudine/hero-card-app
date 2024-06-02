import React, { useEffect, useRef, useState } from 'react'
import SearchItem from './SearchItem'

export default function SearchBarModal({ modal, setModal, setSelectedHeroData }) {
  const [searchValue, setSearchValue] = useState('')
  const [heroList, setHeroList] = useState()
  const [loading, setLoading] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const fetchHero = async () => {
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
  }

  const closeModal = (e) => {
    if (e.target.id === 'backdrop')
      setModal(false)
  }

  useEffect(() => {
    fetchHero()
    if (!searchValue)
      setHeroList(null)
  }, [searchValue])

  return (
    <div className={modal ? `absolute z-50 w-screen h-screen flex justify-center pt-48 bg-black/60 backdrop-blur-[2px]` : `hidden`} onClick={e => closeModal(e)} id="backdrop">
      <div className="w-[50%] h-fit">
        <div className={heroList ? `w-full h-fit bg-white flex items-center justify-end py-4 px-4 rounded-t-lg` : `w-full h-fit bg-white flex items-center justify-end py-4 px-4 rounded-lg`} onClick={e => console.log(e)}>
          <div className="w-full flex items-center">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
            <input type="text" className="bg-red-100 w-[90%] outline-none" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          </div>
          <span>Enter</span>
        </div>
        <div className={heroList ? `bg-white max-h-[350px] w-full overflow-scroll rounded-b-lg` : `hidden`}>
          {heroList?.map(hero => <SearchItem key={hero?.id} data={hero} setSelectedHeroData={setSelectedHeroData} setModal={setModal} setSeachValue={setSearchValue} />)}
        </div>
      </div>
    </div>
  )
}
