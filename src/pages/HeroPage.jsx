import { useEffect } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import HeroCard from '../Components/HeroCard'

export default function HeroPage() {
  const [heroData, setHeroData, setLocation] = useOutletContext()

  const currentLocation = useLocation()

  useEffect(() => {
    setLocation(currentLocation.pathname.slice(0, 6))
  }, [currentLocation])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Tilt glareEnable={true}>
        <HeroCard hero={heroData[0]} />
      </Tilt>
    </div>
  )
}
