import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponent } from './genre.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { Genre } from '../../core/@types/genre';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ListMoviesComponent } from '../list-movies/list-movies.component';
import { SpyLocation } from '@angular/common/testing';
import { ElementRef } from '@angular/core';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;

  beforeEach(async () => {
    const mockGenres: Genre[] = [
      {
        id: 1,
        name: 'terror',
      },
      {
        id: 2,
        name: 'ação',
      },
      {
        id: 3,
        name: 'comédia',
      },
    ];

    const tmdbServiceSpy = jasmine.createSpyObj<TmdbService>(['getGenres']);

    tmdbServiceSpy.getGenres.and.returnValue(of(mockGenres));

    await TestBed.configureTestingModule({
      imports: [GenreComponent],
      providers: [
        { provide: TmdbService, useValue: tmdbServiceSpy },
        provideRouter([
          { path: '**', redirectTo: '' },
          { path: '', component: ListMoviesComponent },
        ]),
        { provide: Location, useClass: SpyLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve scrollar para a esquerda o valor recebido quando scroll for chamado', () => {
    const mockNativeElement = jasmine.createSpyObj('nativeElement', [
      'scrollBy',
    ]);

    const mockElementRef = {
      nativeElement: mockNativeElement,
    } as ElementRef<HTMLDivElement>;

    component.carousel = mockElementRef;

    const scrollValue = 200;
    component.scroll(scrollValue);

    expect(mockNativeElement.scrollBy).toHaveBeenCalledWith({
      left: scrollValue,
      behavior: 'smooth',
    });
  });
});
