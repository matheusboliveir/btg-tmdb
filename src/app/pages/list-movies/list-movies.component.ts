import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieWithGenres } from '../../core/@types/movie';
import { ListMoviesResolver } from '../../core/@types/list-movies';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { CoreRoutes } from '../../core/config/core-routes';

@UntilDestroy()
@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [MovieCardComponent, MatPaginatorModule],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.scss',
})
export class ListMoviesComponent implements OnInit {
  public currentPage = 1;
  public totalMovies = 1;
  public movies: MovieWithGenres[] = [];
  public title = 'Filmes';

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    combineLatest({
      data: this.route.data,
      params: this.route.params,
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ data, params }) => {
        const listMovies = data['listMovies'] as ListMoviesResolver;
        this.movies = listMovies.movies;
        this.title = listMovies.title;
        this.totalMovies = listMovies.totalMovies;
        this.currentPage = Number(params['page']) || 1;
      });
  }

  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.router.navigate(['../', this.currentPage], { relativeTo: this.route });
  }

  public detailCard(movie: MovieWithGenres) {
    this.router.navigate([CoreRoutes.DETAIL_MOVIE, movie.id]);
  }
}
