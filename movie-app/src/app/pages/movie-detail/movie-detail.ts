import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { WatchlistService } from '../../services/watchlist';
import { MovieDetail } from '../../models/movie.model';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css'],
})
export class MovieDetailComponent implements OnInit {
  movie!: MovieDetail;
  loading = true;
  imageBase = environment.tmdbImageUrl;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    public watchlist: WatchlistService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tmdb.getMovieDetail(id).subscribe({
      next: (m) => {
        this.movie = m;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load movie detail:', err);
        this.loading = false;
      },
    });
  }

  toggle(): void {
    if (this.watchlist.isAdded(this.movie.id)) {
      this.watchlist.remove(this.movie.id);
    } else {
      this.watchlist.add(this.movie);
    }
  }
}
