import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '../../services/store/store.service';
import { ApiService } from '../../services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  productForm: FormGroup;
  editMode = false;
  selectedProduct: any;
  private subscription: Subscription;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  constructor(
    private apiService: ApiService,
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
    this.store.getSelectedProduct().subscribe((newProduct: any) => {
      if (newProduct) {
        this.editMode = true;
        this.selectedProduct = newProduct;
        this.productForm.patchValue(newProduct);
      } else {
        this.editMode = false;
        this.productForm.reset();
      }
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.editMode) {
        this.store.updateProduct(this.selectedProduct.id, this.productForm.value).subscribe();
      } else {
        this.store.addProduct(this.productForm.value).subscribe();
      }
    }
  }

  onCancel() {
    if (this.editMode) {
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
    }
  }

}
