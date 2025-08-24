import { MovieWithGenres } from './movie';

export interface ListMoviesResolver {
  title: string;
  movies: MovieWithGenres[];
  totalMovies: number;
}
