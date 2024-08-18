import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { Observable, of } from 'rxjs';
import { Product } from '../../core/models/warehouseItem';
import { Store } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  constructor(
    private store: Store,
  ) {
    this.store.fetchProducts();
  }

  selectedProduct: Product;
  items: Observable<Product[]>;

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.store.fetchProducts().subscribe(() => {
      this.items = this.store.getAllProducts();
    });
  }

  addItem(): void {
    this.store.setSelectedProduct(undefined);
  }

  editItem(item: Product): void {
    this.store.setSelectedProduct(item);
  }
}
