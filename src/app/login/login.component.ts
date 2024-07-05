import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  standalone: true,
  imports: [FormsModule, HoverDirective, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  email: string = '';

  constructor(private route: Router, private loginService: LoginService) {
    // this.route.navigate(['/rooms', 'add']);
  }

  login() {
    if (this.loginService.login(this.email, this.password)) {
      // alert('login Successful');
      this.route.navigate(['/rooms', 'add']);
    }
  }
}
