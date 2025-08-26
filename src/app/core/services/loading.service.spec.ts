import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { skip, Subscription } from 'rxjs';

describe('LoadingService', () => {
  let service: LoadingService;
  let subscribe: Subscription | undefined = undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    if (subscribe) {
      subscribe.unsubscribe();
      subscribe = undefined;
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loading$ deve emitir true quando show é chamado', (done) => {
    service.hide();
    subscribe = service.loading$.pipe(skip(1)).subscribe((load) => {
      expect(load).toBeTrue();
      done();
    });
    service.show();
  });

  it('loading$ deve emitir false quando hide é chamado', (done) => {
    service.show();
    subscribe = service.loading$.pipe(skip(1)).subscribe((load) => {
      expect(load).toBeFalse();
      done();
    });
    service.hide();
  });
});
