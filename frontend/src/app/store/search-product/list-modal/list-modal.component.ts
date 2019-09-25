import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/product";
import {ApiService} from "../../../@api/api.service";
import {Variation} from "../../../models/variation";

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss']
})
export class ListModalComponent implements OnInit {
  arg: string = '';
  variations: Variation[] = [];
  selectedVariations: Variation[] = [];
  select:any;
  @Output() closeForm = new EventEmitter<any>();
  @Output() createForm = new EventEmitter<Variation[]>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  searchProducts() {
    this.api.product.searchByArg().filter({arg: this.arg}).promise().then(resp=> {
      this.variations = resp
    })
  }

  addVariation(variation) {
    if(variation.select){
      variation.amount = 1;
      this.selectedVariations.push(variation)
    } else {
      const index: number = this.selectedVariations.indexOf(variation);
        this.selectedVariations.splice(index, 1);
    }
  }

  close() {
    this.selectedVariations = [];
    this.closeForm.emit();
  }

  submit() {
    this.createForm.emit(this.selectedVariations);
  }

}
