import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../../models/member";

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss']
})
export class AddNewMemberComponent implements OnInit {
  addFrom: FormGroup;
  submitted = false;
  permissions: Array<any>;
  new_member: Member;

  @Output() closeForm = new EventEmitter<any>();
  @Output() addMember = new EventEmitter<Member>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.addFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      permission: ['', [Validators.required]]
    });
    this.new_member = new Member();
    this.permissions = ['stuff'];
  }

  get f() { return this.addFrom.controls; }

  close() {
    this.closeForm.emit();
  }

  onInvite() {
    this.submitted = true;
    if (this.addFrom.invalid) {
      return;
    }
    this.addMember.emit(this.new_member);
  }

}
