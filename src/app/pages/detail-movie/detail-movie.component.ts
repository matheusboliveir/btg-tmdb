import { ActorCardComponent } from './../../core/components/actor-card/actor-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { Cast, MovieDetail } from '../../core/@types/movie';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../core/components/tag/tag.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { combineLatest, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-detail-movie',
  standalone: true,
  imports: [CommonModule, TagComponent, ActorCardComponent],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.scss',
})
export class DetailMovieComponent implements OnInit {
  public movie!: MovieDetail;
  public cast!: Cast[];
  public director!: string;
  public screenplay!: string;
  public readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w780';
  public readonly bgBaseUrl = 'https://image.tmdb.org/t/p/w1920';

  private tmdb = inject(TmdbService);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = Number(params['id']);
          return combineLatest({
            detail: this.tmdb.getDetailMovie(id),
            credit: this.tmdb.getCredits(id),
          });
        }),
        untilDestroyed(this)
      )
      .subscribe(({ credit, detail }) => {
        this.movie = detail;
        const directors = credit.crew
          .filter((staf) => staf.job === 'Director')
          .map((direc) => direc.name)
          .join(', ');
        this.director = directors;
        const screenplays = credit.crew
          .filter((staf) => staf.job === 'Screenplay')
          .map((direc) => direc.name)
          .join(', ');
        this.screenplay = screenplays;
        this.cast = credit.cast;
      });
  }
}
