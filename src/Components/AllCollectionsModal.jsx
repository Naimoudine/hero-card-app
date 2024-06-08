import React from 'react'

export default function AllCollectionsModal({ collection, hero, setCardsAdded, setCollectionMsg, setCollectionsModalOn }) {
  const handleCollections = (e) => {
    const collectionId = e.target.id
    const collectionExists = collection.filter(col => col.id === collectionId)
    if (collectionExists.length > 0) {
      const cardExists = collectionExists[0].cards.filter(card => card.id === hero.id)
      if (cardExists.length === 0) {
        collectionExists[0].cards.push(hero)
        // setCardsAdded(true)
        setCollectionMsg(`${hero.name}#${hero.id} added to your ${collectionExists[0].title} collection`)
      }
      else {
        setCollectionMsg(`${hero.name}#${hero.id} already exists in your ${collectionExists[0].title} collection`)
      }
    }
    setCollectionsModalOn(false)
    setTimeout(() => { setCollectionMsg('') }, 1800)
  }
  return (
    <div className="absolute top-0 py-1 translate-x-full rounded-lg -right-4 bg-black/50 backdrop-blur-sm">
      <ul>
        {collection.map(col => <li className="px-8 cursor-pointer hover:bg-black/65" key={col.id} id={col.id} onClick={e => handleCollections(e)}>{col.title}</li>)}
      </ul>
    </div>
  )
}
