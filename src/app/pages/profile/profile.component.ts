import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/core/models/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string;
  userSubscription: Subscription;
  orders: Order[] = [];
  isLoading = false;
  showPopup = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => (this.userId = user ? user.id : null)
    );

    this.isLoading = true;
    this.profileService.fetchOrders().subscribe((orders) => {
      this.orders = orders.filter((order) => {
        return order.userId === this.userId;
      });
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onCancel(orderId: string) {
    this.profileService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id !== orderId);
      this.showPopup = true;
    });
  }

  closePopup() {
    this.showPopup = false;
  }
}
