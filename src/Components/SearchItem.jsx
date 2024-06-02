import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

export default function SearchItem({ data, setSelectedHeroData, setModal, setSearchValue }) {
  const navigate = useNavigate()

  const onSelect = () => {
    setSelectedHeroData([data])
    localStorage.setItem('hero', JSON.stringify([data]))
    navigate(`/hero/${data?.id}`)
    setModal(false)
    setSearchValue('')
  }

  return (
    <div className="search-item" onClick={onSelect}>
      <img className="mr-4 max-h-[50px] w-auto" src={data?.image?.url} alt={data?.name} />
      <span>{data?.name}</span>
    </div>
  )
}
