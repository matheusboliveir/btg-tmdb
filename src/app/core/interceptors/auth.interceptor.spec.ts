import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../../environments/environment';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  const mockToken = 'seu-token-de-teste-aqui';

  beforeEach(() => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);
    environment.tmdbApiKey = mockToken;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),

        provideHttpClientTesting(),

        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve adicionar o token de autorização para requisições da API TMDB', () => {
    const testUrl = environment.apiUrl + '/movies';

    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`
    );

    req.flush({});
  });

  it('não deve adicionar o token para requisições fora da API TMDB', () => {
    const testUrl = 'https://outra-api.com/data';

    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });

  it('deve chamar loading.show() e loading.hide() para requisições da API TMDB', () => {
    const testUrl = environment.apiUrl + '/movies';

    httpClient.get(testUrl).subscribe();

    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).not.toHaveBeenCalled();

    const req = httpTestingController.expectOne(testUrl);

    req.flush({});

    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });

  it('deve chamar loading.show() e loading.hide() para requisições de outras URLs', () => {
    const testUrl = 'https://outra-api.com/data';

    httpClient.get(testUrl).subscribe();

    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).not.toHaveBeenCalled();

    const req = httpTestingController.expectOne(testUrl);

    req.flush({});

    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });

  it('deve chamar loading.hide() mesmo se a requisição falhar', () => {
    const testUrl = environment.apiUrl + '/movies';

    httpClient.get(testUrl).subscribe({
      error: () => {},
    });

    expect(loadingServiceSpy.show).toHaveBeenCalled();

    const req = httpTestingController.expectOne(testUrl);

    req.flush('Erro de rede', { status: 500, statusText: 'Erro de rede' });

    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });
});
