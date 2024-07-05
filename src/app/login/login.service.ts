import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedin: boolean = false;
  isAdmin: boolean = false;
  constructor() {}
  login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'Admin') {
      alert('login Successful');
      this.isLoggedin = true;
      this.isAdmin = true;
    }

    if (email === 'user@gmail.com' && password === 'user') {
      alert('login Successful');
      this.isLoggedin = true;
      this.isAdmin = true;
    }
    return this.isLoggedin;
  }
}
