import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"

import { query, userCreatedPinsQuery, userSavedPinsQuery } from "../uttils/data"

import { client } from "../client"
import Spinner from "./Spinner"
import MasonryLayout from "./MasonryLayout"

const rendomImage =
  "https://source.unsplash.com/1600x900/?coffee, desk, street, cat"

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"

const UserProife = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState("Created")
  const [activeBtn, setActiveBtn] = useState("Created")

  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const queryMs = query(userId)
    client.fetch(queryMs).then((data) => {
      setUser(data[0])
    })
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const queryMs = userCreatedPinsQuery(userId)
      client.fetch(queryMs).then((data) => {
        setPins(data)
      })
    } else {
      const queryMs = userSavedPinsQuery(userId)
      client.fetch(queryMs).then((data) => {
        setPins(data)
      })
    }
  }, [userId, text])

  if (!user) {
    return <Spinner message={"Loading profile ...."} />
  }

  const logOut = () => {

    localStorage.clear()

    navigate("/login")
  }
  return (
    <div className="relative pb-5 justify-center items-center">
      <div className="flex  flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="relative flex flex-col justify-center items-center">
            <img
              src={rendomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-lg object-cover"
              src={user.image}
              alt='user-pic'
            />
            <h1 className="font-bold text-lg text-center">{user.userName}</h1>
          </div>
          <div className="absolute top-2 right-5 z-1">
            {userId === user._id && (
              <button
                type="button"
                className="bg-white  p-3 rounded-lg cursor-pointer outline-none"
                onClick={logOut}
              >
                <AiOutlineLogout color="red" font={25} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn("created")
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn("saved")
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProife
