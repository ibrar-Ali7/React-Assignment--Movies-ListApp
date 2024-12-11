import React from 'react'
import './NavBar.css'
import { CiSearch } from "react-icons/ci";



export default function NavBar() {
  return (
    <>
    <h1>E-MOVIES</h1>
    <div className='search-navbar'>
      <input type='text' placeholder='Search movie...' value='' onChange='' className='input-field'></input>
      <button className="Search-button">
      </button>
      <CiSearch />
    </div>
    </>
  )
}
