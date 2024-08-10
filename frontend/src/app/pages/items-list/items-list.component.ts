import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from "./list-item/list-item.component";
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { Observable, of } from "rxjs";
import { WarehouseItem } from "../../core/models/warehouseItem";
import { ItemsMockService } from "./items.mock.service";

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, AddItemFormComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {
  @ViewChild('addItemDialog') dialogElement: ElementRef<HTMLDialogElement>
  @ViewChild(AddItemFormComponent) productForm?: AddItemFormComponent;
  items$: Observable<WarehouseItem[]> = this.itemsMockService.items

  constructor(private itemsMockService: ItemsMockService) { }

  addItemToShipment(id: number): void {
    this.itemsMockService.addToShipment(id)
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
    // Here you would typically send the form data to a service
    this.closeModal();
  }
}
