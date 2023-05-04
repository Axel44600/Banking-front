import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  async register() {
    await this.router.navigate(['register']);
  }

  login() {
    this.errorMessages = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: async (data) => {
        localStorage.setItem('token', data.token as string)
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(<string>data.token);
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          await this.router.navigate(['admin/dashboard']);
        } else {
          await this.router.navigate(['user/dashboard']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessages.push(err.error.errorMessage);
      }
    })

  }
}
