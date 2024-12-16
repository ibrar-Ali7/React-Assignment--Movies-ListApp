import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { BiMovie } from 'react-icons/bi';






export default function NavBar() {
 
  const [movies,setMovies]=useState([])
  const [searchQuery,setSearchQuery] =useState('')
  const [sortBy,setSortBy] =useState('popularity.desc')
  const [genre , setGenre]=useState([])
  const [selectedGenres, SetselectedGenres]=useState('')

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
  const handleGenreSelect = (event)=>{
    setSelectGenre(event.target.value )
  }
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: '2602e2e2b6a0568c0af89fc3d77e3211',
            },
          }
        );
        SetselectedGenres(response.data.genres); // Set genres in state
        console.log(response.data.genres); // Log genres for debugging
      } catch (error) {
        console.error('Error fetching genres:', error); // Log error for debugging
      }
    };
    fetchGenres();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: '2602e2e2b6a0568c0af89fc3d77e3211',
              sort_by: sortBy,
              page: 1,
              with_genres: selectedGenres,
              query: searchQuery, 
            },
          }
        );
        setMovies(response.data.results); 
        console.log(response.data.results); 
      } catch (error) {
        console.error('Error fetching movies:', error); 
      }
    };

    fetchMovies();
  }, [searchQuery, sortBy, selectedGenres]);
  return (
    <div>
    <h2>E-MOVIES</h2>
    <div className='search-navbar'>
      <input type='text' placeholder='Search movie...' value={searchQuery} onChange={handleOnChange} className='input-field'></input>
      <button className="Search-button" onClick={handleSearchSubmit}><AiOutlineSearch /></button>  
    </div>
    <div className='filters'>
    <label htmlFor="sort-by">Sort By:</label>
    <select  id="sort-by" value={sortBy} onChange={handleSortChange}>
    <option value="popularity.desc"> Popularity Descending</option>
    <option value="popularity.asc"> Popularity Ascending</option>
    <option value="vote_average.asc"> Vote Average Ascending</option>
    <option value="vote_average.desc"> Vote Average Descending</option>
    <option value="release_date.asc"> Popularity Ascending</option>
    <option value="release_date.desc"> Popularity Descending</option>
    </select>
    <label htmlFor="genre">Genre:</label>
    <select  id="genre" value={selectedGenres} onChange={handleGenreSelect}>
    <option value=""> All</option>
    {genre.map((g) =>(
      <option key={g.id}  value="g.id">
        {g.name}
      </option>
    ))}
    </select>
    {/* Movies List */}
    <div className="movie-wrapper">
  {movies.length > 0 ? (
    movies.map((movie) => (
      <div key={movie.id} className="movie">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p> 
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
    ))
  ) : (
    <p>No movies found.</p> 
  )}
</div>
    

  ))
    </div>

    </div> 
  )
}