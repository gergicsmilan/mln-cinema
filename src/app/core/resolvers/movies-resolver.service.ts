import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';
import { MoviesService } from '../services/movies.service';

@Injectable({ providedIn: 'root' })
export class MoviesResolverService implements Resolve<Movie[]> {
  constructor(
    private dataService: DataStorageService,
    private moviesService: MoviesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Movie[] | Observable<Movie[]> | Promise<Movie[]> {
    const movies = this.moviesService.getMovies();

    if (movies.length <= 0) {
      return this.dataService.fetchMovies();
    } else {
      return movies;
    }
  }
}
