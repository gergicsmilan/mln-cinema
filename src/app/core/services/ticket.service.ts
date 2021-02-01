import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private tickets: Ticket[] = [];
  ticketsChanged = new Subject<Ticket[]>();

  constructor(private httpClient: HttpClient) {}

  getTickets() {
    return this.tickets.slice();
  }

  addTicket(ticketType: string, seat: string) {
    const id = this.tickets.length;

    const price = this.ticketPriceSetter(ticketType);

    this.tickets.push({ id: id, type: ticketType, seat: seat, price: price });
    this.ticketsChanged.next(this.tickets.slice());
  }

  removeTicket() {
    this.tickets.pop();
    this.ticketsChanged.next(this.tickets.slice());
  }

  changeTicketType(id: number, type: string) {
    this.tickets.map((ticket) => {
      if (ticket.id === +id) {
        ticket.type = type;
        ticket.price = this.ticketPriceSetter(type);
      }
      return ticket;
    });
    this.ticketsChanged.next(this.tickets.slice());
  }

  removeTickets() {
    this.tickets = [];
    this.ticketsChanged.next(this.tickets.slice());
  }

  createOrder(date: string, tickets: Ticket[], movie: Movie, userId?: string) {
    const order = {
      date: date,
      tickets: tickets,
      movie: movie,
      userId: userId,
    };

    return this.httpClient
      .post(
        'https://mln-cinema-default-rtdb.firebaseio.com/tickets.json',
        order
      )
      .pipe(catchError(this.handleError));
  }

  private ticketPriceSetter(ticketType: string) {
    let price = 0;
    switch (ticketType) {
      case 'full_price':
        price = 5;
        break;
      case 'student':
        price = 2.5;
        break;
      case 'child':
        price = 2;
        break;
    }
    return price;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'Something went wrong! Please try again later!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
  }
}
