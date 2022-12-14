import React, { useState, useEffect } from 'react'
import { feedQuery, searchQuery } from '../uttils/data'
import { useParams } from 'react-router-dom'
import { client } from '../client'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const {categoryId} = useParams()
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)
      client.fetch(query).then(data => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then(data => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])


  if (loading) return <Spinner message='we are adding new ideas to your feed!!!' />

  if (!pins?.length) return <h2 className='text-center font-bold text-lg'>No pins available!</h2>
  
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed