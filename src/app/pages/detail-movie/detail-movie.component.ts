import { ActorCardComponent } from './../../core/components/actor-card/actor-card.component';
import { Component } from '@angular/core';
import { Cast, MovieDetail } from '../../core/@types/movie';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../core/components/tag/tag.component';

@Component({
  selector: 'app-detail-movie',
  standalone: true,
  imports: [CommonModule, TagComponent, ActorCardComponent],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.scss',
})
export class DetailMovieComponent {
  public movie!: MovieDetail;
  public cast!: Cast[];
  public director!: string;
  public screenplay!: string;
  public readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
}
