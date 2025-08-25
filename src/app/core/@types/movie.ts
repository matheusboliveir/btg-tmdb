import { Genre } from './genre';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieWithGenres extends Movie {
  genres: Genre[];
}

export interface MovieDetail extends MovieWithGenres {
  belongs_to_collection: Collection[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: LanguageMovie[];
  status: string;
  tagline: string;
}

export type Company = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Country = {
  iso_3166_1: string;
  name: string;
};

export type LanguageMovie = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
