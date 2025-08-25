import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  public get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public show() {
    this.loading.next(true);
  }
  public hide() {
    this.loading.next(false);
  }
}
