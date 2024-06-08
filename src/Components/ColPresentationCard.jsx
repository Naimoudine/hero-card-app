import { useNavigate, useOutletContext } from 'react-router-dom'

export default function ColPresentationCard({ hero }) {
  const { setSelectedHeroData, collection } = useOutletContext()

  const navigate = useNavigate()

  const handleSelectedHero = (e) => {
    const selectedHeroId = e.currentTarget.id
    if (selectedHeroId) {
      setSelectedHeroData([hero])
      localStorage.setItem('hero', JSON.stringify([hero]))
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
