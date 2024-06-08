import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import AddCollectionModal from '../components/AddCollectionModal'

export default function CollectionsPage() {
  const [isEmojiModal, setIsEmojiModal] = useState(false)

  const { collection, setCollection, collectionCards } = useOutletContext()
  const navigate = useNavigate()

  return (
    <div className="page">
      { isEmojiModal && <AddCollectionModal modal={setIsEmojiModal} setCollection={setCollection} collectionCards={collectionCards} />}
      <h1 className="page-title">Collections</h1>
      <div className="card-collection">
        {collection?.map((col, id) => (
          <div className="flex flex-col items-center justify-center rounded-lg w-[200px] h-[150px] cursor-pointer" style={{ backgroundColor: `${col.color}` }} key={id} onClick={() => navigate(`/collections/${col.id}`)}>
            <p>
              {col.emoji.emoji}
              {' '}
              {col.title}
            </p>
            <span className="text-sm opacity-60">
              Cards:
              {' '}
              {col.cards.length}
            </span>
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
