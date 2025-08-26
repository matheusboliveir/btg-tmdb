import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TmdbService } from './tmdb.service';
import { GeoService } from './geo.service';
import {
  GetGenresResponse,
  GetMovieCreditsResponse,
  GetNowPlayingResponse,
} from '../@types/tmdb-api';
import { Genre } from '../@types/genre';
import { Cast, Crew, Movie, MovieDetail } from '../@types/movie';
import { provideHttpClient } from '@angular/common/http';

const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
];

const mockMovies: Movie[] = [
  { genre_ids: [28, 12], id: 1, title: 'Test Movie 1' } as Movie,
  { genre_ids: [28], id: 2, title: 'Test Movie 2' } as Movie,
];

const mockNowPlayingResponse: GetNowPlayingResponse = {
  results: mockMovies,
  page: 1,
  total_pages: 1,
  total_results: 2,
};

const crewMock = [
  {
    name: 'Diretor 01',
    job: 'Director',
  },
  {
    name: 'Diretor 02',
    job: 'Director',
  },
  {
    name: 'Roterista 01',
    job: 'Screenplay',
  },
  {
    name: 'Roterista 02',
    job: 'Screenplay',
  },
] as unknown as Crew[];

const castMock = [
  {
    name: 'Ator 01',
    character: 'Personagem 01',
  },
  {
    name: 'Ator 02',
    character: 'Personagem 02',
  },
] as unknown as Cast[];

const creditsMock: GetMovieCreditsResponse = {
  id: 1,
  cast: castMock,
  crew: crewMock,
};

const mockGenresResponse: GetGenresResponse = { genres: mockGenres };

describe('TmdbService', () => {
  let service: TmdbService;
  let httpTestingController: HttpTestingController;
  let geoServiceSpy: jasmine.SpyObj<GeoService>;
  const mockCountryCode = 'BR';
  const mockLanguage = 'pt-BR';

  beforeEach(() => {
    geoServiceSpy = jasmine.createSpyObj<GeoService>([
      'getCountryCode',
      'getLanguage',
    ]);
    geoServiceSpy.getCountryCode.and.returnValue(of(mockCountryCode));
    geoServiceSpy.getLanguage.and.returnValue(mockLanguage);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TmdbService,
        { provide: GeoService, useValue: geoServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TmdbService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve chamar a API now_playing com os parâmetros corretos e transformar o resultado', (done) => {
    const page = 1;
    const expectedUrl = `${environment.apiUrl}/movie/now_playing?language=${mockLanguage}&page=${page}&region=${mockCountryCode}`;

    service.getNowPlaying(page).subscribe((response) => {
      expect(response.results.length).toBe(2);
      expect(response.results[0].genres?.length).toBe(2);
      expect(response.results[0].genres?.[0].name).toBe('Action');
      expect(response.results[1].genres?.length).toBe(1);
      done();
    });

    const genresReq = httpTestingController.expectOne(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
    expect(genresReq.request.method).toBe('GET');
    genresReq.flush(mockGenresResponse);

    const moviesReq = httpTestingController.expectOne(expectedUrl);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(mockNowPlayingResponse);
  });

  it('deve chamar a API MoviesByGenre com os parâmetros corretos e transformar o resultado', (done) => {
    const page = 1;
    const genreId = 1;
    const expectedUrl = `${
      environment.apiUrl
    }/discover/movie?with_genres=${genreId.toString()}&sort_by=popularity.desc&page=${page}&region=${mockCountryCode}&language=${mockLanguage}`;

    service.getMoviesByGenre(genreId, page).subscribe((response) => {
      expect(response.results.length).toBe(2);
      expect(response.results[0].genres?.length).toBe(2);
      expect(response.results[0].genres?.[0].name).toBe('Action');
      expect(response.results[1].genres?.length).toBe(1);
      done();
    });

    const genresReq = httpTestingController.expectOne(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
    expect(genresReq.request.method).toBe('GET');
    genresReq.flush(mockGenresResponse);

    const moviesReq = httpTestingController.expectOne(expectedUrl);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(mockNowPlayingResponse);
  });

  it('deve chamar a API popular com os parâmetros corretos e transformar o resultado', (done) => {
    const page = 1;
    const expectedUrl = `${environment.apiUrl}/movie/popular?language=${mockLanguage}&page=${page}&region=${mockCountryCode}`;

    service.getPopular(page).subscribe((response) => {
      expect(response.results.length).toBe(2);
      expect(response.results[0].genres?.length).toBe(2);
      expect(response.results[0].genres?.[0].name).toBe('Action');
      expect(response.results[1].genres?.length).toBe(1);
      done();
    });

    const genresReq = httpTestingController.expectOne(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
    expect(genresReq.request.method).toBe('GET');
    genresReq.flush(mockGenresResponse);

    const moviesReq = httpTestingController.expectOne(expectedUrl);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(mockNowPlayingResponse);
  });

  it('deve chamar a API search com os parâmetros corretos e transformar o resultado', (done) => {
    const page = 1;
    const query = 'movie';
    const expectedUrl = `${environment.apiUrl}/search/movie?language=${mockLanguage}&page=${page}&region=${mockCountryCode}&query=${query}`;

    service.getSearchMovie(query, page).subscribe((response) => {
      expect(response.results.length).toBe(2);
      expect(response.results[0].genres?.length).toBe(2);
      expect(response.results[0].genres?.[0].name).toBe('Action');
      expect(response.results[1].genres?.length).toBe(1);
      done();
    });

    const genresReq = httpTestingController.expectOne(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
    expect(genresReq.request.method).toBe('GET');
    genresReq.flush(mockGenresResponse);

    const moviesReq = httpTestingController.expectOne(expectedUrl);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(mockNowPlayingResponse);
  });

  it('deve chamar a API credits com os parâmetros corretos e transformar o resultado', (done) => {
    const id = 1;
    const expectedUrl = `${environment.apiUrl}/movie/${id}/credits?language=${mockLanguage}`;

    service.getCredits(id).subscribe((response) => {
      expect(response.id).toBe(1);
      expect(response.cast.length).toBe(2);
      expect(response.crew.length).toBe(4);
      done();
    });

    const moviesReq = httpTestingController.expectOne(expectedUrl);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(creditsMock);
  });

  it('deve fazer a requisição de gêneros apenas uma vez (cache)', (done) => {
    service.getGenres().subscribe((genres) => {
      expect(genres.length).toBe(2);
    });

    const req1 = httpTestingController.expectOne(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
    req1.flush(mockGenresResponse);

    service.getGenres().subscribe((genres) => {
      expect(genres.length).toBe(2);
      done();
    });

    httpTestingController.expectNone(
      `${environment.apiUrl}/genre/movie/list?language=${mockLanguage}`
    );
  });

  it('deve chamar getDetailMovie com o ID correto', (done) => {
    const movieId = 123;
    const expectedUrl = `${environment.apiUrl}/movie/${movieId}?language=${mockLanguage}`;
    const mockDetailResponse = {
      id: 123,
      title: 'Detail Movie',
    } as MovieDetail;

    service.getDetailMovie(movieId).subscribe((response) => {
      expect(response).toEqual(mockDetailResponse);
      done();
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailResponse);
  });
});
