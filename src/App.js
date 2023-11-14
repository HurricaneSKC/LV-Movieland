import { useEffect } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from './store/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants'

import useModal from "./hooks/useModal"

import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'

import 'reactjs-popup/dist/index.css'
import './app.scss'

const App = () => {

  const { movies } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const navigate = useNavigate()
  const { renderModal } = useModal();


  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const viewTrailer = async (movie) => renderModal(<YouTubePlayer movieId={movie.id} />);

  return (
    <div className="App">
      <Header 
        searchMovies={searchMovies} 
        searchParams={searchParams} 
        setSearchParams={setSearchParams} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
