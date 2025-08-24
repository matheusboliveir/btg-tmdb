import { Component, OnInit, inject } from '@angular/core';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { MovieWithGenres } from '../../core/@types/movie';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cartaz',
  standalone: true,
  imports: [MovieCardComponent, MatPaginatorModule],
  templateUrl: './cartaz.component.html',
  styleUrl: './cartaz.component.scss',
})
export class CartazComponent implements OnInit {
  private tmdb = inject(TmdbService);
  public currentPage = 1;
  public totalMovies = 1;
  public movies: MovieWithGenres[] = [];

  public ngOnInit(): void {
    this.loadMovies();
  }

  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.loadMovies();
  }

  private loadMovies(): void {
    this.tmdb.getNowPlaying(this.currentPage).subscribe((response) => {
      this.movies = response.results;
      this.totalMovies = response.total_results;
    });
  }
}
