import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, API_KEY } from '../constants';

// Helper Functions
const formatApiResponse = ({ results: movies, page, total_pages }) => {
  const nextPage = page < total_pages ? page + 1 : null;
  return { movies, nextPage };
};

const mergeMovieLists = (currentList, newList) => {
  if (!currentList.movies) currentList.movies = [];
  if (!newList.movies) return;

  const existingIds = new Set(currentList.movies.map(movie => movie.id));
  const filteredNewMovies = newList.movies.filter(movie => !existingIds.has(movie.id));

  currentList.movies.push(...filteredNewMovies);
  currentList.nextPage = newList.nextPage;
};

// API Service
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page }) => {
        let query = `/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`;
        if (page) query += `&page=${page}`;
        return query;
      },
      transformResponse: formatApiResponse,
      merge: mergeMovieLists,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getMoviesBySearchParam: builder.query({
      query: ({ searchParam, page }) => {
        let query = `/search/movie?api_key=${API_KEY}`
        if (searchParam) query += `&query=${encodeURIComponent(searchParam)}`;
        if (page) query += `&page=${page}`;
        return query;
      },
      transformResponse: formatApiResponse,
      merge: mergeMovieLists,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesBySearchParamQuery,
} = moviesApi;
