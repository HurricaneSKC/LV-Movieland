import { useState } from 'react';
import { ENDPOINT, API_KEY } from '../constants';

const useMovieFetch = () => {
    const [videoKey, setVideoKey] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovie = async (id) => {
        const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
        console.log(URL);

        setVideoKey(null);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const videoData = await response.json();

            if (videoData.videos && videoData.videos.results.length) {
                const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
                setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { getMovie, videoKey, isLoading, error };
};

export default useMovieFetch;
