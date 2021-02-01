import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  isMobileMenuOpen = false;
  isSmallerDevice: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });

    if (window.innerWidth <= 769) {
      this.isSmallerDevice = true;
    } else {
      this.isSmallerDevice = false;
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onResize(event) {
    if (event.target.innerWidth <= 769) {
      this.isSmallerDevice = true;
    } else {
      this.isSmallerDevice = false;
    }
  }

  onSignOut() {
    this.authService.logout();
    if (this.isSmallerDevice) this.toggleMobileMenu();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
