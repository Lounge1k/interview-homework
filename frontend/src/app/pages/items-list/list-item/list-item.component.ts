import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from "../../../core/models/warehouseItem";
import { Store } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: Product
  @Output() addToShipment: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    private store: Store
  ) { }

  edit(item: any) {
    this.store.setSelectedProduct(item);
  }

}
