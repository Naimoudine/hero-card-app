import { useNavigate } from 'react-router-dom'

export default function SearchItem({ data, selected }) {
  const navigate = useNavigate()

  const onSelect = () => {
    selected([data])
    localStorage.setItem('hero', JSON.stringify([data]))
    navigate(`/hero/${data?.id}`)
  }
  return (
    <div className="search-item" onClick={onSelect}>
      <img className="mr-2 max-h-[50px] w-auto" src={data?.image?.url} alt={data?.name} />
      <span>{data?.name}</span>
    </div>
  )
}
