import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styleUrls: ['./feature-item.component.scss']
})
export class FeatureItemComponent implements OnInit {

  item_name: string = '';
  constructor(
    private route: ActivatedRoute
  ) {
    this.item_name = this.route.snapshot.params['id'];
    console.dir('snapshop=>', this.route.snapshot);
  }

  ngOnInit() {
  }

}
