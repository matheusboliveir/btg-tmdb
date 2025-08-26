import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { MovieWithGenres } from '../../@types/movie';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let movieMock = {
    title: 'filme',
    poster_path: '/a.png',
    vote_average: 7.5,
    genres: [
      {
        id: 1,
        name: 'terror'
      },
      {
        id: 2,
        name: 'ação'
      },
      {
        id: 3,
        name: 'comédia'
      }
    ]
  } as MovieWithGenres;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = movieMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('firstGenres deve devolver string[] com os dois primeiros generos', () => {
    expect(component.firstGenres.length).toBe(2);
    expect(component.firstGenres[0]).toBe('terror');
    expect(component.firstGenres[1]).toBe('ação');
  })

  it('failToLoadImage deve mudar o src da imagem para foto padrão', () => {
    const mockEvent = {
      target: {
        src: 'exemplo.jpeg'
      }
    } as unknown as Event;
    component.failToLoadImage(mockEvent);
    expect((mockEvent.target as HTMLImageElement).src).toBe('/assets/img/nocover.jpg');
  })
});
