import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminAuth = {email: 'admin', password: 'admin'};

  currentUser = new BehaviorSubject(null);

  constructor() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.currentUser.next(JSON.parse(token));
    }
  }

  loginUser(email, password) {
    const role = email.toLowerCase() === this.adminAuth.email && password.toLowerCase() === this.adminAuth.password ? 'admin' : 'user';
    const tokenData = {email, password, role};
    sessionStorage.setItem('token', JSON.stringify(tokenData));
    this.currentUser.next(tokenData);
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this.currentUser.next(null);
  }

  isAuthenticated() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser.value;
  }
}
