import { useNavigate, useOutletContext } from 'react-router-dom'

export default function PresentationCard({ hero }) {
  const [heroData, setHeroData, favorites, setFavorites] = useOutletContext()

  const navigate = useNavigate()

  const fetchHero = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/${id}`)
    const data = await res.json()
    setHeroData([data])
  }

  const handleSelectedHero = (e) => {
    const selectedHeroId = e.currentTarget.id
    if (selectedHeroId) {
      fetchHero(selectedHeroId)
      localStorage.setItem('hero', JSON.stringify(heroData))
    }

    navigate(`/hero/${selectedHeroId}`)
  }

  return (
    <div className="flex mb-4 sm:mb-0 border-2 rounded-md p-2 min-h-[16rem] max-h-[16rem] w-[12rem] relative" style={{ background: `url(${hero?.image?.url}) center/cover` }} role="presentation" id={hero?.id} onClick={e => handleSelectedHero(e)}>
      <div className="self-end">
        <h3 className="text-white">{hero?.name}</h3>
        <p className="text-white">{hero?.biography['full-name']}</p>
      </div>
    </div>
  )
}
