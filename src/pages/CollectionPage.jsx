import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import ColPresentationCard from '../components/ColPresentationCard'

export default function CollectionPage() {
  const { collection } = useOutletContext()
  const { id } = useParams()

  return (
    <div className="page">
      <h1 className="page-title">{collection.filter(col => col.id === id)[0].title}</h1>
      <div className="card-collection">
        {collection.filter(col => col.id === id)[0].cards?.map(card => <ColPresentationCard hero={card} key={card.id} />)}
      </div>
    </div>
  )
}
