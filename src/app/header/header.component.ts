import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@app/services/auth.service';
import { CoursesService } from '@app/services/courses.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Login</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <label class="modal-body__email-label" for="email">Email</label>
      <br>
      <input type="text" class="modal-body__email-input" #email placeholder="Email">
      <br>
      <br>
      <label class="modal-body__password-label" for="password">Password</label>
      <br>
      <input type="password" class="modal-body__password-input" #password placeholder="Password">
    </div>
    <div class="modal-footer">
      <button type="button" class="modal-footer__login" (click)="onClickLogin(email.value, password.value)">Sign in</button>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class LoginModalComponent {
  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {}

  onClickLogin(email, password) {
   this.authService.loginUser(email, password);
   this.activeModal.close();
  }
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  haveNotify = false;
  isAuthenticated = false;

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated()
    .subscribe(
      currentUser => {
        this.isAuthenticated = currentUser === null ? false : true;
      });
  }

  onClickNotify() {
    this.haveNotify = !this.haveNotify;
  }

  onClickLogin() {
    this.modalService.open(LoginModalComponent);
  }

  onClickSettings() {
    this.router.navigateByUrl('/profile');
  }

  onClickLogout() {
    this.router.navigateByUrl('/browse-courses');
    this.authService.logoutUser();
  }
}
