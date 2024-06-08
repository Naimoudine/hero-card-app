import { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useOutletContext } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import HeroCard from '../components/HeroCard'
import AllCollectionsModal from '../components/AllCollectionsModal'

export default function HeroPage() {
  const [favMsg, setFavMsg] = useState('')
  const [collectionMsg, setCollectionMsg] = useState('')
  const [collectionsModalOn, setCollectionsModalOn] = useState(false)
  const [cardsAdded, setCardsAdded] = useState(false)

  const { selectedHeroData, favorites, setFavorites, collection } = useOutletContext()

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

  // useEffect(() => {}, [collection, cardsAdded])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="mb-4">{favMsg || collectionMsg || ''}</p>
      <Tilt glareEnable={true} glareBorderRadius="0.5rem">
        <HeroCard hero={loaderData ? loaderData[0] : selectedHeroData[0]} />
      </Tilt>
      <div className="relative flex mt-8">
        <button className="bg-gray-400 cta" type="button" onClick={handleFavorite}>Add to favorite</button>
        <button className="ml-2 bg-gray-400 cta" type="button" onClick={() => setCollectionsModalOn(true)}>Add to Collection</button>
        {collectionsModalOn && <AllCollectionsModal collection={collection} hero={loaderData ? loaderData[0] : selectedHeroData[0]} setCardsAdded={setCardsAdded} setCollectionsModalOn={setCollectionsModalOn} setCollectionMsg={setCollectionMsg} />}
      </div>
    </div>
  )
}
