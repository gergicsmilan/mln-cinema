import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-ticket-type-picker',
  templateUrl: './ticket-type-picker.component.html',
  styleUrls: ['./ticket-type-picker.component.css'],
})
export class TicketTypePickerComponent implements OnInit {
  tickets: Ticket[] = [];
  ticketSubscription: Subscription;
  @Input() selectedMovie: Movie;
  @Output() orderHandler: EventEmitter<any> = new EventEmitter();

  constructor(private ticketSrvice: TicketService) {}

  ngOnInit(): void {
    this.ticketSubscription = this.ticketSrvice.ticketsChanged.subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      }
    );
  }

  ngOnDestroy() {
    this.ticketSrvice.removeTickets();
    this.ticketSubscription.unsubscribe();
  }

  handleTicketTypeChange(value: string, index: number) {
    this.ticketSrvice.changeTicketType(index, value);
  }

  onOrder() {
    this.orderHandler.emit();
  }
}
