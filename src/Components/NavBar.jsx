import React, { useState } from 'react'
import './NavBar.css'
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';




export default function NavBar() {
 
  const [movies,setMovies]=useState([])
  const [searchQuery,setSearchQuery] =useState('')
  const [sorBy,setSortBy] =useState('popularity.desc')
  const handleOnChange = (event) =>{
    setSearchQuery(event.target.value)
  }
  const handleSearchSubmit= async()=>{
    const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params:{
      api_key:'2602e2e2b6a0568c0af89fc3d77e3211',
      query: searchQuery
      }
    }
    )
    setMovies(response.data.results);
    console.log(response.data.results);
  }
  
  const handleSortChange = (event)=>{
    setSortBy(event.target.value)
  }
  return (
    <div>
    <h2>E-MOVIES</h2>
    <div className='search-navbar'>
      <input type='text' placeholder='Search movie...' value={searchQuery} onChange={handleOnChange} className='input-field'></input>
      <button className="Search-button" onClick={handleSearchSubmit}><AiOutlineSearch /></button>  
    </div>
    <div className='filters'>
    <label htmlFor="sort-by">Sort By:</label>
    <select  id="sort-by" value={sorBy} onChange={handleSortChange}>
    <option value="popularity.desc"> Popularity Descending</option>
    <option value="popularity.asc"> Popularity Ascending</option>
    <option value="vote_average.asc"> Vote Average Ascending</option>
    <option value="vote_average.desc"> Vote Average Descending</option>
    <option value="release_date.asc"> Popularity Ascending</option>
    <option value="release_date.desc"> Popularity Descending</option>
    </select>
    <label htmlFor="genre">Genre:</label>
    <select  id="genre" value={selectGenre} onChange={handleGenreSelect}>
    <option value=""> All</option>
    </select>
    </div>

    </div> 
  )
}