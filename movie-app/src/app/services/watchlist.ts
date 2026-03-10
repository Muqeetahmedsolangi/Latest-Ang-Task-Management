import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private key = 'watchlist';

  isAdded(id: number): boolean {
    return this.getAll().some((m) => m.id === id);
  }
  getAll(): Movie[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  add(movie: Movie): void {
    const list = this.getAll();
    if (!this.isAdded(movie.id)) {
      list.push(movie);
      localStorage.setItem(this.key, JSON.stringify(list));
    }
  }

  remove(id: number): void {
    const list = this.getAll().filter((m) => m.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
