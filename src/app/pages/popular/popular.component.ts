import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { MovieWithGenres } from '../../core/@types/movie';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [MovieCardComponent, MatPaginatorModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent implements OnInit {
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
    this.tmdb.getPopular(this.currentPage).subscribe((response) => {
      this.movies = response.results;
      this.totalMovies = response.total_results;
    });
  }
}
