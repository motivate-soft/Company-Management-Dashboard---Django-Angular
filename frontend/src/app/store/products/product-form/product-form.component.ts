import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Customer} from "../../../models/customer";
import {Product} from "../../../models/product";
import {Variation} from "../../../models/variation";
import {MeService} from "../../../@services/me.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
registerForm: FormGroup;
  @Input() product: Product;
  submitted = false;
  disabled = false;
  customer: Customer;
  file: any = null;
  variation_index: number = 1;

  variations: any = [
    {name: 'option', value: null}
  ];
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
        <div class="dz-thumbnail" style="margin: auto">
          <img data-dz-thumbnail style="width: 118px; height: 118px; border-radius: 5px;">
        </div>
      </div>`
  };

  @Output() closeForm = new EventEmitter<any>();
  @Output() createForm = new EventEmitter<Product>();
  @Output() updateForm = new EventEmitter<Product>();

  constructor(
    private me: MeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    // this.product.variations = this.product.variations;
    // this.product.price = 0.00;
    this.product.company = this.me.user.company_id;
    this.customer = new Customer();

    this.registerForm = this.formBuilder.group({
      file: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      product_sku: ['', [Validators.required]],
      product_price: ['', [Validators.required]],
    });
  }

  get f() { return this.registerForm.controls; }

  onUploadSuccess(file) {
    this.product.image = file[1];
    console.log(this.product);
  }

  remove(e) {
    this.product.image = null;
  }

  addVariation(i) {
    this.variation_index++;
    this.variations.push({name: 'option'+ this.variation_index, value: null});
    console.log(this.variations);
  }

  updateVariation() {
    let that = this;
    setTimeout(function (){
      that.defineVariations(that);
    }, 300);
  }

  defineVariations(that) {
    let allArrays = [];
      for (let i=0; i<that.variations.length; i++) {
        let variation_value = [];
        if(that.variations[i].value) {
          for (let j=0; j<that.variations[i].value.length; j++) {
            variation_value.push(that.variations[i].value[j].value);
          }
          if (variation_value.length != 0) {
            allArrays.push(variation_value);
          }
        }
      }
      that.product.variations = [];
      let varation_titles = that.allPossibleCases(allArrays);
      for (let k=0; k<varation_titles.length; k++) {
        let variation = new Variation();
        variation.title = varation_titles[k];
        that.product.variations.push(variation);
      }
  }


  allPossibleCases(arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = this.allPossibleCases(arr.slice(1));  // recur with the rest of array
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + '/' + allCasesOfRest[i]);
        }
      }
      return result;
    }
  }

  deleteVariation(index) {
    this.variations.splice(index,1);
    this.defineVariations(this);
  }

  close() {
    this.closeForm.emit();
  }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.product.variation_type = this.variations;
    if(this.product.id) {
      this.updateForm.emit(this.product);
    } else {
      this.createForm.emit(this.product);
    }
  }

}
