import { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useOutletContext } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import HeroCard from '../Components/HeroCard'

export default function HeroPage() {
  const [heroData, setHeroData, favorites, setFavorites, collection, setCollection] = useOutletContext()

  const loaderData = useLoaderData()

  const handleFavorite = () => {
    let favExists = null
    if (loaderData)
      favExists = favorites.filter(fav => fav.id === loaderData[0].id)
    else
      favExists = favorites.filter(fav => fav.id === heroData[0].id)

    if (favExists.length === 0 && loaderData)
      setFavorites(prev => [...prev, loaderData[0]])
    if (favExists.length === 0 && !loaderData)
      setFavorites(prev => [...prev, heroData[0]])
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Tilt glareEnable={true} glareBorderRadius="0.5rem">
        <HeroCard hero={loaderData ? loaderData[0] : heroData[0]} />
      </Tilt>
      <div className="flex mt-8">
        <button className="cta bg-gray-400" type="button" onClick={handleFavorite}>Add to favorite</button>
        <button className="cta bg-gray-400 ml-2" type="button">Add to Collection</button>
      </div>
    </div>
  )
}
