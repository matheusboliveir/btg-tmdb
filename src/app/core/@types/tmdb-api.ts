import { Genre } from './genre';
import { Cast, Crew, Movie, MovieDetail, MovieWithGenres } from './movie';

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

export type GetMovieDetailResponse = MovieDetail;

export interface GetMovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
