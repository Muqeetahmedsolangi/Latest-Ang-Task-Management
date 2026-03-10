import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isInWatchlist = false;
  @Output() addToWatchlist = new EventEmitter<Movie>();
  @Output() removeFromWatchlist = new EventEmitter<number>();

  imageBase = environment.tmdbImageUrl;

  getImage(): string {
    return this.movie.poster_path
      ? `${this.imageBase}${this.movie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image';
  }

  toggleWatchlist(): void {
    if (this.isInWatchlist) {
      this.removeFromWatchlist.emit(this.movie.id);
    } else {
      this.addToWatchlist.emit(this.movie);
    }
  }
}
