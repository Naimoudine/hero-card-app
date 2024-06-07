import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import AddCollectionModal from '../components/AddCollectionModal'

export default function CollectionsPage() {
  const [isEmojiModal, setIsEmojiModal] = useState(false)

  const { collection, setCollection } = useOutletContext()

  useEffect(() => {
    console.log(collection)
  }, [collection])

  return (
    <div className="page">
      { isEmojiModal && <AddCollectionModal modal={setIsEmojiModal} setCollection={setCollection} />}
      <h1 className="mb-8">Collections</h1>
      <div className="flex flex-wrap gap-8">
        {collection?.map((col, id) => (
          <div className="flex items-center justify-center rounded-lg w-[200px] h-[150px]" style={{ backgroundColor: `${col.color}` }} key={id}>
            <p>
              {col.emoji.emoji}
              {' '}
              {col.title}
            </p>
          </div>
        ))}
        <button className="flex items-center justify-center border-2 border-white rounded-lg w-[200px] h-[150px]" onClick={() => setIsEmojiModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="white" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
          <span className="text-white">New</span>
        </button>
      </div>
    </div>
  )
}
