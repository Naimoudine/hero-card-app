import { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useOutletContext } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import HeroCard from '../Components/HeroCard'

export default function HeroPage() {
  const [favMsg, setFavMsg] = useState('')
  const [selectedHeroData, setSelectedHeroData, favorites, setFavorites, collection, setCollection] = useOutletContext()

  const loaderData = useLoaderData()

  const handleFavorite = () => {
    if (loaderData) {
      const favExists = favorites.filter(fav => fav.id === loaderData[0].id)
      if (favExists.length === 0) {
        setFavorites(prev => [...prev, loaderData[0]])
        setFavMsg(`${loaderData[0]?.name}#${loaderData[0]?.id} added to favorites`)
      }
      else {
        setFavMsg(`${favExists[0]?.name}#${favExists[0]?.id} already exists in your favorites`)
      }
      setTimeout(() => { setFavMsg('') }, 1800)
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="mb-4">{favMsg || ''}</p>
      <Tilt glareEnable={true} glareBorderRadius="0.5rem">
        <HeroCard hero={loaderData ? loaderData[0] : selectedHeroData[0]} />
      </Tilt>
      <div className="flex mt-8">
        <button className="cta bg-gray-400" type="button" onClick={handleFavorite}>Add to favorite</button>
        <button className="cta bg-gray-400 ml-2" type="button">Add to Collection</button>
      </div>
    </div>
  )
}
