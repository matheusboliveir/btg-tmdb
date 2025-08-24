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
  GetNowPlayingResponseWithGenres,
} from '../@types/tmdb-api';
import { MovieWithGenres } from '../@types/movie';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private http = inject(HttpClient);

  private geo = inject(GeoService);

  private genres!: BehaviorSubject<Genre[]>;

  public getNowPlaying(
    page: number
  ): Observable<GetNowPlayingResponseWithGenres> {
    const language = this.geo.getLanguage();
    return this.loadGeoAndGenders().pipe(
      switchMap(({ country, genres }) =>
        this.http
          .get<GetNowPlayingResponse>(
            `${environment.apiUrl}/movie/now_playing?language=${language}&page=${page}&region=${country}`
          )
          .pipe(
            map((response) => {
              response.results = response.results.map<MovieWithGenres>(
                (movie) => ({
                  ...movie,
                  genres: this.getMovieGenres(movie.genre_ids, genres),
                })
              );
              return response as GetNowPlayingResponseWithGenres;
            })
          )
      )
    );
  }

  private getMovieGenres(genreIds: number[], genres: Genre[]): Genre[] {
    return genres.filter((genre) => genreIds.includes(genre.id));
  }

  private loadGeoAndGenders() {
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
