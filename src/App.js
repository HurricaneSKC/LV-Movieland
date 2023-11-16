import { useRef, useState } from 'react'
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom"

import useModal from "./hooks/useModal"
import { useGetMoviesQuery, useGetMoviesBySearchParamQuery } from './store/moviesApi'

import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'

import 'reactjs-popup/dist/index.css'
import './app.scss'
import useInfiniteScroll from './hooks/useInfiniteScroll'

const App = () => {

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();

  const { renderModal } = useModal();

  const { data: allMovies, isLoading: isLoadingMovies } = useGetMoviesQuery({
    page
  });
  
  const { data: searchedMovies, isLoading: isLoadingSearchMovies } = useGetMoviesBySearchParamQuery({
    searchParam: searchQuery,
    page
  });

  const loadMoreMovies = () => {
    if(allMovies) setPage(allMovies.nextPage);
  }

  const loadAllMovies = useRef();
  useInfiniteScroll(
    {ref: loadAllMovies,
    loadMore: loadMoreMovies}
  )

  const searchMovies = (query) => {
    setPage(1)
    navigate(`/?search=${query}`);
  };

  const viewTrailer = async (movie) => renderModal(<YouTubePlayer movieId={movie.id} />);

  return (
    <div className="App">

      <Header searchMovies={searchMovies} />

      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <Movies movies={searchQuery ? searchedMovies?.movies : allMovies?.movies || []} viewTrailer={viewTrailer} />
                <div className="loadmoremovies" ref={loadAllMovies}>
                  {isLoadingMovies && <h1>...loading</h1>}
                  {isLoadingSearchMovies && <h1>...loading</h1>}
                </div> 
            </>
          } />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
