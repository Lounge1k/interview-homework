import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from "./list-item/list-item.component";
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { Observable, of } from "rxjs";
import { WarehouseItem } from "../../core/models/warehouseItem";
import { ItemsService } from "../../services/items.service";

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, AddItemFormComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  @ViewChild('addItemDialog') dialogElement: ElementRef<HTMLDialogElement>
  @ViewChild(AddItemFormComponent) productForm?: AddItemFormComponent;

  constructor(private itemsService: ItemsService) { }

  selectedProduct: any;
  items: Observable<any[]>;

  ngOnInit(): void {
    this.getItems();
  }

  addItemToShipment(id: number): void {
    // this.itemsService.addProduct()
  }

  getItems(): void {
    this.items = this.itemsService.getAllProducts()
  }

  addItem(): void {
    this.selectedProduct = undefined;
    this.dialogElement?.nativeElement.showModal();
    // console.log(this.dialogElement?.nativeElement)
    // this.dialog.showModal();
  }

  editItem(item: any): void {
    this.selectedProduct = item;
    console.log(this.selectedProduct);
    this.dialogElement?.nativeElement.showModal();
  }

  closeModal() {
    this.dialogElement?.nativeElement.close();
  }

  onFormSubmit(formData: any) {
    this.items = this.itemsService.addProduct(formData);
    this.closeModal();
  }
}
