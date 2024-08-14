import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from "./list-item/list-item.component";
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
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
    this.dialogElement?.nativeElement.showModal();
    // console.log(this.dialogElement?.nativeElement)
    // this.dialog.showModal();
  }

  closeModal() {
    this.dialogElement?.nativeElement.close();
    this.productForm?.reset();
  }

  onFormSubmit(formData: any) {
    console.log(formData);
    this.items = this.itemsService.addProduct(formData);
    // Here you would typically send the form data to a service
    this.closeModal();
  }
}
