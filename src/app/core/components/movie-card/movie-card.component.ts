import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TagComponent } from '../tag/tag.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieWithGenres } from '../../@types/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    TagComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  public readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  @Input() public movie!: MovieWithGenres;
  @Output() public clickCard = new EventEmitter<MovieWithGenres>();

  public get firstGenres(): string[] {
    return this.movie.genres.slice(0, 2).map((genre) => genre.name);
  }

  public failToLoadImage(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/img/nocover.jpg';
  }
}
