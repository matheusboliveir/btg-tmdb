import { Genre } from './genre';
import { Movie, MovieWithGenres } from './movie';

export type GetGenresResponse = {
  genres: Genre[];
};

export interface GetNowPlayingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponseWithGenres extends GetNowPlayingResponse {
  results: MovieWithGenres[];
  genrerName?: string;
}

export type GetPopularResponse = GetNowPlayingResponse;

export type GetMoviesByGenreResponse = GetNowPlayingResponse;
