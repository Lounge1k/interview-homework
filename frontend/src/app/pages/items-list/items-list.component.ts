import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { Observable, of } from 'rxjs';
import { Product } from '../../core/models/warehouseItem';
import { ApiService } from '../../services/api/api.service';
import { Store } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  @ViewChild('addItemDialog') dialogElement: ElementRef<HTMLDialogElement>;
  @ViewChild(AddItemFormComponent) productForm?: AddItemFormComponent;

  constructor(
    private apiService: ApiService,
    private store: Store,
  ) {
    this.store.fetchProducts();
  }

  selectedProduct: Product;
  items: Observable<Product[]>;

  ngOnInit(): void {
    this.getItems();
  }

  addItemToShipment(id: number): void {
    // this.itemsService.addProduct()
  }

  getItems(): void {
    // this.items = this.store.getAllProducts();
    this.store.fetchProducts().subscribe(() => {
      this.items = this.store.getAllProducts();
    });
  }

  addItem(): void {
    this.store.setSelectedProduct(undefined);
    // console.log(this.dialogElement?.nativeElement)
    // this.dialog.showModal();
  }

  editItem(item: Product): void {
    this.store.setSelectedProduct(item);
    // console.log(this.selectedProduct);
    // this.dialogElement?.nativeElement.showModal();
  }

  closeModal() {
    this.dialogElement?.nativeElement.close();
  }

  // onFormSubmit(formData: any) {
  //   this.items = this.store.addProduct(formData);
  //   this.closeModal();
  // }
}
