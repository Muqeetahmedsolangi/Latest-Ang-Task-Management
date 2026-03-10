import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb';
import { WatchlistService } from '../../services/watchlist';
import { Movie } from '../../models/movie.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { MovieCardComponent } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, MovieCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  movies: Movie[] = [];
  currentQuery = '';
  currentPage = 1;
  totalPages = 1;
  loading = false;

  constructor(
    private tmdb: TmdbService,
    private watchlist: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.loadTrending();
  }

  loadTrending(): void {
    this.loading = true;
    this.tmdb.getTrending(this.currentPage).subscribe({
      next: (res) => {
        this.movies = res.results;
        this.totalPages = res.total_pages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load trending:', err);
        this.loading = false;
      },
    });
  }

  onSearch(query: string): void {
    this.currentQuery = query;
    this.currentPage = 1;
    if (!query.trim()) {
      this.loadTrending();
      return;
    }
    this.loading = true;
    this.tmdb.searchMovies(query, 1).subscribe({
      next: (res) => {
        this.movies = res.results;
        this.totalPages = res.total_pages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.loading = false;
      },
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
    if (this.currentQuery.trim()) {
      this.loading = true;
      this.tmdb.searchMovies(this.currentQuery, page).subscribe({
        next: (res) => {
          this.movies = res.results;
          this.loading = false;
        },
        error: (err) => {
          console.error('Pagination failed:', err);
          this.loading = false;
        },
      });
    } else {
      this.loadTrending();
    }
  }

  isInWatchlist(id: number): boolean {
    return this.watchlist.isAdded(id);
  }

  onAdd(movie: Movie): void {
    this.watchlist.add(movie);
  }

  onRemove(id: number): void {
    this.watchlist.remove(id);
  }
}
