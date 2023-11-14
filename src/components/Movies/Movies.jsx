import Movie from '../Movie'
import './Movies.scss'

const Movies = ({ movies, viewTrailer, closeCard }) => {

    return (
        <div className="movies-container" data-testid="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    )
}

export default Movies
