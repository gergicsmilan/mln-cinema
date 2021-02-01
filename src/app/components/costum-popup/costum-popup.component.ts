import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-costum-popup',
  templateUrl: './costum-popup.component.html',
  styleUrls: ['./costum-popup.component.css'],
})
export class CostumPopupComponent implements OnInit {
  @Input() header: string;
  @Input() message: string;
  @Input() btnMsg: string;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
