import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ListMoviesComponent } from './list-movies.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Movie, MovieWithGenres } from '../../core/@types/movie';
import { PageEvent } from '@angular/material/paginator';
import { CoreRoutes } from '../../core/config/core-routes';

describe('ListMoviesComponent', () => {
  let component: ListMoviesComponent;
  let fixture: ComponentFixture<ListMoviesComponent>;
  let spyRouter: jasmine.SpyObj<Router>;

  let movieMock = [
    {
      title: 'filme',
      poster_path: '/a.png',
      vote_average: 7.5,
      genres: [
        {
          id: 1,
          name: 'terror',
        },
      ],
    },
  ] as MovieWithGenres[];

  beforeEach(async () => {
    const spyRoute = jasmine.createSpyObj<ActivatedRoute>([], {
      data: of({
        listMovies: { movies: movieMock, title: 'Teste', totalMovies: 19 },
      }),
      params: of({ page: 2 }),
    });

    spyRouter = jasmine.createSpyObj<Router>(['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListMoviesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: spyRoute },
        { provide: Router, useValue: spyRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve popular movies, title, totalMovies e currentPage quando chamar ngOninit', fakeAsync(() => {
    tick();
    expect(component.movies).toBe(movieMock);
    expect(component.title).toBe('Teste');
    expect(component.totalMovies).toBe(19);
    expect(component.currentPage).toBe(2);
  }));

  it('deve atualizar currentPage e navegar quando onPageChange é chamado', () => {
    const event = { pageIndex: 3 } as PageEvent;
    component.onPageChange(event);
    expect(component.currentPage).toBe(4);
    expect(spyRouter.navigate).toHaveBeenCalled();
  });

  it('deve navegar para pagina do filme quando detailCard é chamado', () => {
    const movie = movieMock[0];
    component.detailCard(movie);
    expect(spyRouter.navigate).toHaveBeenCalledWith([
      CoreRoutes.DETAIL_MOVIE,
      movie.id,
    ]);
  });
});
