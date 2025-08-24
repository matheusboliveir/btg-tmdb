import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GeoService } from './geo.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Genre } from '../@types/genre';
import {
  GetGenresResponse,
  GetNowPlayingResponse,
  GetPopularResponse,
  MovieResponseWithGenres,
} from '../@types/tmdb-api';
import { Movie, MovieWithGenres } from '../@types/movie';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private http = inject(HttpClient);

  private geo = inject(GeoService);

  private genres!: BehaviorSubject<Genre[]>;

  public getNowPlaying(
    page: number
  ): Observable<MovieResponseWithGenres> {
    return this.loadGeoAndGenrers().pipe(
      switchMap(({ country, genres }) =>
        this.http
          .get<GetNowPlayingResponse>(
            `${environment.apiUrl}/movie/now_playing?language=${this.language}&page=${page}&region=${country}`
          )
          .pipe(
            map((response) => {
              response.results = this.getMoviesGenres(response.results, genres);
              return response as MovieResponseWithGenres;
            })
          )
      )
    );
  }

  public getPopular(page: number): Observable<MovieResponseWithGenres> {
    return this.loadGeoAndGenrers().pipe(switchMap(({ country, genres }) =>
      this.http.get<GetPopularResponse>(
        `${environment.apiUrl}/movie/popular?language=${this.language}&page=${page}&region=${country}`
      )
        .pipe(
          map((response) => {
            response.results = this.getMoviesGenres(response.results, genres);
            return response as MovieResponseWithGenres;
          })
        )));
  }

  private get language(): string {
    return this.geo.getLanguage();
  }

  private getMoviesGenres(movies: Movie[], genresArray: Genre[]): MovieWithGenres[] {
    const genreMap = new Map(genresArray.map(g => [g.id, g]));
    return movies.map<MovieWithGenres>(
      (movie) => {
        const genres = movie.genre_ids
          .map((id) => genreMap.get(id))
          .filter((genre): genre is Genre => genre !== undefined);
        return {
          ...movie,
          genres,
        }
      }
    )
  }

  private loadGeoAndGenrers(): Observable<GeoGenrer> {
    return combineLatest({
      country: this.geo.getCountryCode(),
      genres: this.getGenres(),
    });
  }

  public getGenres(): Observable<Genre[]> {
    const language = this.geo.getLanguage();
    if (this.genres) {
      return this.genres.asObservable();
    }
    return this.http
      .get<GetGenresResponse>(
        `${environment.apiUrl}/genre/movie/list?language=${language}`
      )
      .pipe(
        map((response) => {
          this.genres = new BehaviorSubject<Genre[]>(response.genres);
          return response.genres;
        })
      );
  }
}


type GeoGenrer = {
  country: string,
  genres: Genre[]
}