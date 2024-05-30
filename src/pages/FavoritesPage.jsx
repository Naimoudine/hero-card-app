import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import PresentationCard from '../Components/PresentationCard'

export default function FavoritesPage() {
  const [heroData, setHeroData, favorites, setFavorites, collection, setCollection] = useOutletContext()

  useEffect(() => { console.log(favorites) }, [favorites])

  return (
    <div className="pt-8 px-4">
      <h1 className="text-4xl text-white font-semibold mb-8">Favorites</h1>
      <div className="flex flex-wrap gap-8">
        {favorites.map(favorite => <PresentationCard key={favorite.id} hero={favorite} />)}
      </div>
    </div>
  )
}
