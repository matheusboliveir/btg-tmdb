import { TestBed } from '@angular/core/testing';

import { GeoService } from './geo.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { GeoInfo } from '../@types/geo-info';

describe('GeoService', () => {
  let service: GeoService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let removeItem: jasmine.SpyObj<(key: string) => void>;

  beforeEach(() => {
    const geoMock = {
      country_code: 'BR',
      timezone: { current_time: new Date().toISOString() },
    } as GeoInfo;

    mockHttpClient = jasmine.createSpyObj<HttpClient>(['get']);

    spyOn(localStorage, 'setItem').and.callFake(() => {});

    removeItem = spyOn(localStorage, 'removeItem').and.callFake(() => {});

    mockHttpClient.get.and.returnValue(of(geoMock));

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });
    service = TestBed.inject(GeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deve buscar iformações geográficas', () => {
    it('do local storage se estiverem disponíveis e forem recentes', (done) => {
      const recentDate = new Date().toISOString();
      mockHttpClient.get.calls.reset();
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify({
          country_code: 'US',
          timezone: { current_time: recentDate },
        })
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: HttpClient, useValue: mockHttpClient }],
      });
      service = TestBed.inject(GeoService);
      service.getGeoInfo().subscribe((geo) => {
        expect(mockHttpClient.get).not.toHaveBeenCalled();
        expect(geo.country_code).toBe('US');
        done();
      });
    });
    it('da API se não estiverem no local storage', (done) => {
      service.getGeoInfo().subscribe((geo) => {
        expect(geo.country_code).toBe('BR');
        expect(mockHttpClient.get).toHaveBeenCalled();
        done();
      });
    });
  });

  it('deve apagar informações geográficas antigas do local storage', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 2);
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({
        country_code: 'US',
        timezone: { current_time: oldDate.toISOString() },
      } as GeoInfo)
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });

    service = TestBed.inject(GeoService);
    expect(removeItem).toHaveBeenCalledWith('geoInfoForBtgTmdb');
  });

  it('deve retornar o código do país', (done) => {
    service.getCountryCode().subscribe((code) => {
      expect(code).toBe('BR');
      done();
    });
  });

  describe('deve retornar o idioma do navegador', () => {
    it('quando disponível', () => {
      spyOnProperty(navigator, 'language').and.returnValue('en-US');

      const lang = service.getLanguage();
      expect(lang).toBe('en-US');
    });

    it('quando userLanguage estiver disponível', () => {
      spyOnProperty(navigator, 'language').and.returnValue('');
      Object.defineProperty(navigator, 'userLanguage', {
        value: 'fr-FR',
        configurable: true,
      });

      const lang = service.getLanguage();
      expect(lang).toBe('fr-FR');
    });

    it('quando nenhum dos dois estiver disponível retornar pt-BR', () => {
      spyOnProperty(navigator, 'language').and.returnValue('');
      Object.defineProperty(navigator, 'userLanguage', {
        value: '',
        configurable: true,
      });

      const lang = service.getLanguage();
      expect(lang).toBe('pt-BR');
    });
  });
});
