export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
}

export interface TmdbResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}
