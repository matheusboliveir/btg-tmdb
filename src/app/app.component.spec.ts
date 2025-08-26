import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ListMoviesComponent } from './pages/list-movies/list-movies.component';
import { SpyLocation } from '@angular/common/testing';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    const svgIconRegistryServiceSpy =
      jasmine.createSpyObj<SvgIconRegistryService>(['addSvg', 'loadSvg']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([
          { path: '**', redirectTo: '' },
          { path: '', component: ListMoviesComponent },
        ]),
        {
          provide: SvgIconRegistryService,
          useValue: svgIconRegistryServiceSpy,
        },
        { provide: Location, useClass: SpyLocation },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
