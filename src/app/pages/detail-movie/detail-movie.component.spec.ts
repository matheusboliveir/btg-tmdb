import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMovieComponent } from './detail-movie.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { Crew, MovieDetail } from '../../core/@types/movie';
import { GetMovieCreditsResponse } from '../../core/@types/tmdb-api';

describe('DetailMovieComponent', () => {
  let component: DetailMovieComponent;
  let fixture: ComponentFixture<DetailMovieComponent>;

  beforeEach(async () => {
    const movieMock = {
      poster_path: '',
      release_date: '2025-08-08',
      tagline: '',
      genres: [],
      overview: '',
      original_title: '',
      spoken_languages: [{ name: '', english_name: '', iso_639_1: '' }],
      budget: 0,
      revenue: 0,
    } as unknown as MovieDetail;

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

    const creditsMock: GetMovieCreditsResponse = {
      id: 1,
      cast: [],
      crew: crewMock,
    };

    const spyRoute = jasmine.createSpyObj<ActivatedRoute>([], {
      params: of({ id: 1 }),
    });

    const tmdbServiceSpy = jasmine.createSpyObj<TmdbService>([
      'getDetailMovie',
      'getCredits',
    ]);

    tmdbServiceSpy.getDetailMovie.and.returnValue(of(movieMock));

    tmdbServiceSpy.getCredits.and.returnValue(of(creditsMock));

    await TestBed.configureTestingModule({
      imports: [DetailMovieComponent],
      providers: [
        { provide: ActivatedRoute, useValue: spyRoute },
        { provide: TmdbService, useValue: tmdbServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
