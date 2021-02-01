import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies: Movie[] = null;
  error: string = null;
  moviesSubscription: Subscription;
  searchTerm: string = '';

  @Input() isLoading: boolean;
  @Input() selectedDate: string;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesSubscription = this.moviesService.moviesChanged.subscribe(
      (movies) => {
        this.movies = movies;
      },
      (errorMsg) => {
        this.error = errorMsg;
      }
    );
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }
}
