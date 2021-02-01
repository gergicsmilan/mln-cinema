import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { MoviesService } from './movies.service';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private moviesService: MoviesService
  ) {}

  fetchMovies() {
    return this.httpClient
      .get<Movie[]>(
        'https://mln-cinema-default-rtdb.firebaseio.com/moovies.json'
      )
      .pipe(
        catchError(this.handleError),
        map((responseData) => {
          const moviesArray: Movie[] = [];
          for (let key in responseData) {
            moviesArray.push({ ...responseData[key], id: key });
          }
          return moviesArray;
        }),
        tap((moviesArray) => {
          this.moviesService.setMovies(moviesArray);
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'Something went wrong! Please try again later!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
  }
}
