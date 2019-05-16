import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';
  wrongCredentials = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  authorize() {
    this.authService.authorize(this.login, this.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('user', response.user);
          localStorage.setItem('token', response.token);
          this.router.navigate(['home']);
        },
        error => {
          if (error.status === 400) {
            this.wrongCredentials = true;
            setTimeout(() => {
              this.wrongCredentials = false;
            }, 3000);
          }
        }
      );
  }
}
