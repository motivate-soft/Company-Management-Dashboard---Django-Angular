import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/customer";
import {MeService} from "../../../@services/me.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  @Input() customer: Customer = new Customer();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any = null;
  dropzoneConfig = {
    url: '/api/v1.0/upload/avatar',
    headers: {
         'Authorization':  "JWT "+ localStorage.getItem('dropify.token')
      },
    parallelUploads: 2,
    maxFilesize:     50000,
    filesizeBase:    1000,
    acceptedFiles: 'image/*',
    addRemoveLinks:  true,
    previewTemplate: `
      <div class="dz-preview dz-file-preview" style="text-align: center">
        <div class="dz-thumbnail">
          <img data-dz-thumbnail style="width: 195px; height: 195px; border-radius: 50%;">
        </div>
      </div>`
  };

  customer_image_view: string = 'background-image: url("assets/img/avatars/avatar_placeholder.png")';
  @Output() closeForm = new EventEmitter<any>();
  @Output() createForm = new EventEmitter<Customer>();
  @Output() updateForm = new EventEmitter<Customer>();

  constructor(
    private formBuilder: FormBuilder,
    private me: MeService
  ) {
    this.customer.owner = this.me.user.id;
    if (this.customer.image) {
      this.customer_image_view = 'background-image: url("statics/image/' + this.customer.image + '")';
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      region: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      apartment: ['', []],
    });
  }

  get f() { return this.registerForm.controls; }

  onUploadSuccess(file) {
    this.customer.image = file[1];
    console.log(this.customer)
  }

  remove(e) {
    this.customer.image = null;
  }

  close() {
    this.closeForm.emit();
  }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if(this.customer.id) {
      this.updateForm.emit(this.customer);
    } else {
      this.createForm.emit(this.customer);
    }

  }

}
