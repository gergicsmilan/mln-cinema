import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { createTodayInputFormat } from '../../utils/util.js';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  minDate: string;
  error: string = null;

  @Output() isLoading = false;
  @Output() selectedDate: string;

  constructor(private dsService: DataStorageService, private router: Router) {}

  ngOnInit(): void {
    this.minDate = createTodayInputFormat();
  }

  onDateChange() {
    this.isLoading = true;
    this.dsService.fetchMovies().subscribe(
      () => {
        this.isLoading = false;
      },
      (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
