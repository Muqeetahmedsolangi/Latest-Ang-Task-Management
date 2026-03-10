import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { WatchlistComponent } from './pages/watchlist/watchlist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: '**', redirectTo: '' },
];
