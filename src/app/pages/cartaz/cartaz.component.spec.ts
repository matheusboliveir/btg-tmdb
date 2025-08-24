import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartazComponent } from './cartaz.component';

describe('CartazComponent', () => {
  let component: CartazComponent;
  let fixture: ComponentFixture<CartazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartazComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
