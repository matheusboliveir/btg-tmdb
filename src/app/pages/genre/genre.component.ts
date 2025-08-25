import { TmdbService } from './../../core/services/tmdb.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Genre } from '../../core/@types/genre';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss',
})
export class GenreComponent implements OnInit {
  public genres: Genre[] = [];
  @ViewChild('carousel', { static: true })
  public carousel!: ElementRef<HTMLDivElement>;
  private tmdb = inject(TmdbService);

  public ngOnInit(): void {
    this.tmdb.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  public scroll(amount: number) {
    this.carousel.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
