import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicketService } from './ticket.service';

@Injectable({ providedIn: 'root' })
export class SeatService {
  private seats = [
    {
      row: {
        first: [
          { id: 'S1', reserved: false, selected: false },
          { id: 'S2', reserved: false, selected: false },
          { id: 'S3', reserved: false, selected: false },
          { id: 'S4', reserved: false, selected: false },
          { id: 'S5', reserved: false, selected: false },
          { id: 'S6', reserved: false, selected: false },
        ],
        second: [
          { id: 'S7', reserved: false, selected: false },
          { id: 'S8', reserved: false, selected: false },
        ],
      },
    },
    {
      row: {
        first: [
          { id: 'S9', reserved: false, selected: false },
          { id: 'S10', reserved: false, selected: false },
          { id: 'S11', reserved: false, selected: false },
          { id: 'S12', reserved: false, selected: false },
          { id: 'S13', reserved: false, selected: false },
          { id: 'S14', reserved: false, selected: false },
        ],
        second: [
          { id: 'S15', reserved: true, selected: false },
          { id: 'S16', reserved: true, selected: false },
        ],
      },
    },
    {
      row: {
        first: [
          { id: 'S17', reserved: false, selected: false },
          { id: 'S18', reserved: false, selected: false },
          { id: 'S19', reserved: false, selected: false },
          { id: 'S20', reserved: false, selected: false },
          { id: 'S21', reserved: false, selected: false },
          { id: 'S22', reserved: false, selected: false },
        ],
        second: [
          { id: 'S23', reserved: false, selected: false },
          { id: 'S24', reserved: false, selected: false },
        ],
      },
    },
  ];
  seatsStatusChanged = new BehaviorSubject(this.seats);

  constructor(private ticketSrv: TicketService) {}

  getSeats() {
    return this.seats.slice();
  }

  setSeatStatus(id: string, rowIndex: number, block: string) {
    const copyOfSeats = [...this.seats];
    let addingTicket = true;

    copyOfSeats[rowIndex].row[block] = copyOfSeats[rowIndex].row[block].map(
      (seat) => {
        if (seat.id === id) {
          addingTicket = !seat.selected;
          return { ...seat, selected: !seat.selected };
        }
        return seat;
      }
    );
    this.seatsStatusChanged.next(copyOfSeats);

    if (addingTicket) {
      this.ticketSrv.addTicket('full_price', id);
    } else {
      this.ticketSrv.removeTicket();
    }
  }

  restoreSeats() {
    const initialSeats = [
      {
        row: {
          first: [
            { id: 'S1', reserved: false, selected: false },
            { id: 'S2', reserved: false, selected: false },
            { id: 'S3', reserved: false, selected: false },
            { id: 'S4', reserved: false, selected: false },
            { id: 'S5', reserved: false, selected: false },
            { id: 'S6', reserved: false, selected: false },
          ],
          second: [
            { id: 'S7', reserved: false, selected: false },
            { id: 'S8', reserved: false, selected: false },
          ],
        },
      },
      {
        row: {
          first: [
            { id: 'S9', reserved: false, selected: false },
            { id: 'S10', reserved: false, selected: false },
            { id: 'S11', reserved: false, selected: false },
            { id: 'S12', reserved: false, selected: false },
            { id: 'S13', reserved: false, selected: false },
            { id: 'S14', reserved: false, selected: false },
          ],
          second: [
            { id: 'S15', reserved: true, selected: false },
            { id: 'S16', reserved: true, selected: false },
          ],
        },
      },
      {
        row: {
          first: [
            { id: 'S17', reserved: false, selected: false },
            { id: 'S18', reserved: false, selected: false },
            { id: 'S19', reserved: false, selected: false },
            { id: 'S20', reserved: false, selected: false },
            { id: 'S21', reserved: false, selected: false },
            { id: 'S22', reserved: false, selected: false },
          ],
          second: [
            { id: 'S23', reserved: false, selected: false },
            { id: 'S24', reserved: false, selected: false },
          ],
        },
      },
    ];

    this.seats = initialSeats;
    this.seatsStatusChanged.next(this.seats.slice());
  }
}
