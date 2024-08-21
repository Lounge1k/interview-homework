import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/warehouseItem';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '../../services/store/store.service';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  // Form Object
  productForm: FormGroup;
  // Is form getting submitted
  isSubmitting = false;
  // Is in edit mode
  editMode = false;
  // Currently selected item for edit
  selectedProduct: Product;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.store.getSelectedProduct().subscribe((newProduct: Product) => {
      if (newProduct) {
        // Editing a product
        this.editMode = true;
        this.selectedProduct = newProduct;
        this.productForm.patchValue(newProduct);
      } else {
        // Creating a new product
        this.editMode = false;
        this.productForm.reset();
      }
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      if (this.editMode) {
        // Update selected product
        this.store.updateProduct(this.selectedProduct.id!, this.productForm.value).subscribe(() => {
          this.isSubmitting = false
        });
      } else {
        // Add newly created product
        this.store.addProduct(this.productForm.value).subscribe(() => {
          this.isSubmitting = false;
        });
      }
    }
  }

  onCancel() {
    if (this.editMode) {
      // Reset item to its original state
      this.productForm.patchValue(this.selectedProduct);
    } else {
      // Reset form to empty state
      this.productForm.reset();
    }
  }

}
