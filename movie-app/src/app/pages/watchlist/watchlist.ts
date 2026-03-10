import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardComponent],
  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.css'],
})
export class WatchlistComponent {
  constructor(public watchlist: WatchlistService) {}

  get movies(): Movie[] {
    return this.watchlist.getAll();
  }

  onRemove(id: number): void {
    this.watchlist.remove(id);
  }
}
