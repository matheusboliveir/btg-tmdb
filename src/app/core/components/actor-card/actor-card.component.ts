import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Cast } from '../../@types/movie';

@Component({
  selector: 'app-actor-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.scss',
})
export class ActorCardComponent {
  public readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  @Input() public actor!: Cast;

  public failToLoadImage(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/img/nocover.jpg';
  }
}
