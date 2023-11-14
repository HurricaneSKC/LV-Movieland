import { useEffect } from 'react';
import ReactPlayer from 'react-player'
import useMovieFetch from '../../hooks/useMovieFetch';

const YoutubePlayer = ({ movieId }) =>{

  const { getMovie, videoKey, isLoading, error } = useMovieFetch();

  useEffect(() => {
    console.log(`Fetching movie details for ID: ${movieId}`);
    getMovie(movieId);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    videoKey && <ReactPlayer 
    className="video-player" 
    url={`https://www.youtube.com/watch?v=${videoKey}`} 
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />);
} 

export default YoutubePlayer;
