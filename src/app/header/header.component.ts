import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class LoginModalComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  haveNotify = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onClickNotify() {
    this.haveNotify = !this.haveNotify;
  }

  onClickLogin() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.name = 'World';
  }
}
