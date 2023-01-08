import React from "react"
import { NavLink, Link } from "react-router-dom"
import { RiHomeFill } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io"

import logo from "../assert/logo.png"
import {categories} from '../uttils/data'

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize"
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize"

const SideBar = ({ user, closeToggle }) => {
  const handleToggle = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className="flex flex-col justify-between bg-white overflow-y-scroll  h-full hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          onClick={handleToggle}
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
      <div className="flex flex-col gap-5 h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
          onClick={handleToggle}
        >
          <RiHomeFill />
          Home
        </NavLink>
        <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
        {categories.slice(0, categories.length - 1).map((category) => (
          <NavLink
            to={`/category/${category.name}`}
            onClick={handleToggle}
            key={category.name}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <img src={ category.image}  className='h-8 w-8 rounded-full shadow-sm' alt="category-pic"/>
            {category.name}
          </NavLink>
        ))}
        <div></div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleToggle}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}

export default SideBar
