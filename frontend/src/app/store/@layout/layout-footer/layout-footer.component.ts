import { Component, HostBinding } from '@angular/core';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styles: [':host { display: block; }']
})
export class LayoutFooterComponent {
  @HostBinding('class.layout-footer') private hostClassMain = true;

  constructor(private storeService: StoreService) {}

  currentBg() {
    return `bg-${this.storeService.layoutFooterBg}`;
  }
}
