import Movie from '../Movie'
import './Movies.scss'

const Movies = ({ movies, viewTrailer }) => {

  return (
    <div className="movies-container" data-testid="movies">
      {Array.isArray(movies) && (
        <>
          {movies.map((movie) => {
            return (
              <Movie 
                  movie={movie} 
                  key={movie.id}
                  viewTrailer={viewTrailer}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export default Movies

