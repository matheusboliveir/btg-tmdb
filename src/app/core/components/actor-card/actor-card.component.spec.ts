import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCardComponent } from './actor-card.component';
import { Cast } from '../../@types/movie';

describe('ActorCardComponent', () => {
  let component: ActorCardComponent;
  let fixture: ComponentFixture<ActorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorCardComponent);
    component = fixture.componentInstance;
    component.actor = {
      name: 'actor',
      character: 'character',
      profile_path: '/a.png',
    } as unknown as Cast;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('quando o failToLoadImage é chamado o src da imagem deve ser trocado por imagem padrão', () => {
    const event = { target: { src: '/a.png' } } as unknown as Event;
    component.failToLoadImage(event);
    expect((event.target as HTMLImageElement).src).toBe(
      '/assets/img/nocover.jpg'
    );
  });
});
