import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode: boolean = true;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.loginMode) {
      this.authService.login(email, password).subscribe(
        (resp) => {
          this.router.navigate(['/profile']);
        },
        (errorMsg) => {
          this.error = errorMsg;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        (resp) => {
          this.router.navigate(['/profile']);
        },
        (errorMsg) => {
          this.error = errorMsg;
        }
      );
    }
  }

  onNavigateSignIn() {
    this.loginMode = !this.loginMode;
  }
}
