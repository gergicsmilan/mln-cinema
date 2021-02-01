import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  moviesChanged = new Subject<Movie[]>();
  movies: Movie[] = [];

  constructor() {}

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
  }

  getMovies() {
    return this.movies.slice();
  }

  getMovie(id: string) {
    const movie = this.movies.filter((movie) => movie.id === id)[0];

    return movie;
  }
}
