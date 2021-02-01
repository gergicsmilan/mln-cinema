import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeatService } from 'src/app/core/services/seat.service';

@Component({
  selector: 'app-seat-picker',
  templateUrl: './seat-picker.component.html',
  styleUrls: ['./seat-picker.component.css'],
})
export class SeatPickerComponent implements OnInit, OnDestroy {
  seats = [];
  seatSrvSubscription: Subscription;

  constructor(private seatService: SeatService) {}

  ngOnInit(): void {
    this.seatSrvSubscription = this.seatService.seatsStatusChanged.subscribe(
      (seats) => {
        this.seats = seats;
      }
    );
  }

  ngOnDestroy(): void {
    this.seatService.restoreSeats();
    this.seatSrvSubscription.unsubscribe();
  }

  clickHandler(id: string, rowIndex: number, block: string) {
    this.seatService.setSeatStatus(id, rowIndex, block);
  }
}
