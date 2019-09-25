import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Variation} from "../../models/variation";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @Output() select = new EventEmitter<Variation[]>();

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      // successDialog.show();
    }, (reason) => {
      // console.log('rejected');
    });
  }

  close(c) {
    c('Cross click');
  }

  createProduct(variations, c) {
    this.select.emit(variations);
    c('Cross click');
  }

}
