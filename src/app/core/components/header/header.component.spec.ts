import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter, Router } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { ListMoviesComponent } from '../../../pages/list-movies/list-movies.component';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let spyRouter: jasmine.Spy;
  beforeEach(async () => {
    const svgIconRegistryServiceSpy =
      jasmine.createSpyObj<SvgIconRegistryService>(['addSvg', 'loadSvg']);
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '**', redirectTo: '' },
          { path: '', component: ListMoviesComponent },
        ]),
        { provide: Location, useClass: SpyLocation },
        {
          provide: SvgIconRegistryService,
          useValue: svgIconRegistryServiceSpy,
        },
      ],
      imports: [HeaderComponent],
    }).compileComponents();
    const router = TestBed.inject(Router);
    spyRouter = spyOn(router, 'navigate').and.stub();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve navegar para a pagina de busca quando searchMovie é chamado e search é valido', () => {
    spyRouter.calls.reset();
    (component.search = 'movie'), component.searchMovie();
    expect(spyRouter).toHaveBeenCalled();
  });

  it('não deve navegar para a pagina de busca quando searchMovie é chamado e search é invalido', () => {
    spyRouter.calls.reset();
    component.search = '  ';
    component.searchMovie();
    expect(spyRouter).not.toHaveBeenCalled();
  });
});
