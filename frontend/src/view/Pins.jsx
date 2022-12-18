import React, { useState } from 'react'
import Feed from '../component/Feed'
import CreatePin from '../component/CreatePin'
import Search from '../component/Search'
import NavBar from '../component/NavBar'
import PinDetails from '../component/PinDetails'
import { Routes, Route } from 'react-router-dom'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins