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
  isDeleting = false;

  constructor(
    private store: Store
  ) { }

  edit(item: Product) {
    this.store.setSelectedProduct(item);
  }

  delete(id: number) {
    this.isDeleting = true;
    this.store.deleteProduct(id).subscribe({
      complete: () => {
        this.isDeleting = false;
      }
    });
  }
}
