import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import FavPresentationCard from '../components/FavPresentationCard'

export default function FavoritesPage() {
  const { favorites } = useOutletContext()

  return (
    <div className="page">
      <h1 className="page-title">Favorites</h1>
      <div className="card-collection">
        {favorites.map(favorite => <FavPresentationCard key={favorite.id} hero={favorite} />)}
      </div>
    </div>
  )
}
