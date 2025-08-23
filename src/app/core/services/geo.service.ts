import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { GeoInfo } from '../@types/geo-info';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  private readonly STORAGE_KEY = 'geoInfoForBtgTmdb';

  private http = inject(HttpClient);

  private geoInfo!: BehaviorSubject<GeoInfo>;

  constructor() {
    const geoInfoStorage = LocalStorageUtil.getItem<GeoInfo>(this.STORAGE_KEY);
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    if (
      geoInfoStorage &&
      new Date(geoInfoStorage.timezone.current_time) > oneDayAgo
    ) {
      this.geoInfo = new BehaviorSubject<GeoInfo>(geoInfoStorage);
    } else {
      LocalStorageUtil.removeItem(this.STORAGE_KEY);
    }
  }

  public getGeoInfo(): Observable<GeoInfo> {
    if (this.geoInfo) {
      return this.geoInfo.asObservable();
    }
    return this.getGeoInfoRequest();
  }

  private getGeoInfoRequest(): Observable<GeoInfo> {
    return this.http.get<GeoInfo>(environment.geoApi).pipe(
      switchMap((geo) => {
        this.geoInfo = new BehaviorSubject<GeoInfo>(geo);
        LocalStorageUtil.setItem(this.STORAGE_KEY, geo);
        return this.geoInfo.asObservable();
      })
    );
  }

  public getCountryCode(): Observable<string> {
    return this.getGeoInfo().pipe(map((geo) => geo.country_code));
  }

  public getLanguage(): string {
    return navigator.language || (navigator as any).userLanguage || 'pt-BR';
  }
}
