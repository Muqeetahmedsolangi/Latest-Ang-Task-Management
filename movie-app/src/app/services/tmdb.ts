import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { Movie, MovieDetail, TmdbResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private base = environment.tmdbBaseUrl;
  private key = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  // Trending movies
  getTrending(page: number = 1): Observable<TmdbResponse> {
    const params = new HttpParams().set('api_key', this.key).set('page', page);
    return this.http.get<TmdbResponse>(`${this.base}/trending/movie/week`, { params });
  }

  // Search movies
  searchMovies(query: string, page: number = 1): Observable<TmdbResponse> {
    const params = new HttpParams().set('api_key', this.key).set('query', query).set('page', page);
    return this.http.get<TmdbResponse>(`${this.base}/search/movie`, { params });
  }

  // Movie detail
  getMovieDetail(id: number): Observable<MovieDetail> {
    const params = new HttpParams().set('api_key', this.key);
    return this.http.get<MovieDetail>(`${this.base}/movie/${id}`, { params });
  }
}
