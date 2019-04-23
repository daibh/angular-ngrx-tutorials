import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserNewComponent } from './user-new/user-new.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  doAddNew = ($event) => {
    $event.preventDefault();
    const modalRef = this.modalService.open(UserNewComponent, { size: "lg" });
    modalRef.componentInstance.currentObj = new Object();
    modalRef.result.then(res => { }, err => { });
  }

}
