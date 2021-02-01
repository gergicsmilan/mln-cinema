import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Movie } from 'src/app/core/models/movie.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  selectedDate: string;
  selectedTime: string;
  authSubscription: Subscription;
  userId: string;
  showPopup = false;
  redirectTimeout;

  @Output() selectedMovie: Movie;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(
      (user) => (this.userId = user ? user.id : null)
    );

    const params: Params = this.activatedRoute.snapshot.params;
    this.selectedDate = params.date;
    this.selectedTime = params.time;
    this.selectedMovie = this.moviesService.getMovie(params.id);

    if (!this.selectedMovie) {
      this.router.navigate(['/movies']);
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  handleOrder() {
    const date = this.selectedDate + ' ' + this.selectedTime;
    const tickets = this.ticketService.getTickets();
    const movie = this.selectedMovie;
    const userId = this.userId;

    this.ticketService
      .createOrder(date, tickets, movie, userId)
      .subscribe(() => {
        this.showPopup = true;
        this.redirectTimeout = setTimeout(() => {
          this.closePopup();
        }, 5000);
      });
  }

  closePopup() {
    clearTimeout(this.redirectTimeout);
    if (this.userId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
