import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddItemFormComponent } from './add-item-form.component';
import { Store } from '../../services/store/store.service';
import { ApiService } from '../../services/api/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;
  let mockStore: any;
  let mockApiService: any;

  beforeEach(waitForAsync(() => {
    mockStore = {
      getSelectedProduct: jasmine.createSpy('getSelectedProduct').and.returnValue(of(null)),
      updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({})),
      addProduct: jasmine.createSpy('addProduct').and.returnValue(of({}))
    };

    mockApiService = jasmine.createSpyObj('ApiService', ['']);

    TestBed.configureTestingModule({
      imports: [
        AddItemFormComponent,  // Import the standalone component directly
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.productForm.value).toEqual({
      name: null,
      quantity: null,
      unitPrice: null
    });
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should show error messages when fields are invalid', () => {
    const nameInput = component.productForm.get('name');
    nameInput?.markAsTouched();
    nameInput?.setValue('');
    fixture.detectChanges();

    const nameError = fixture.debugElement.query(By.css('.form-group:first-child .error-messages')).nativeElement;
    expect(nameError.textContent).toContain('Name is required.');
  });

  it('should enable the submit button if the form is valid', () => {
    component.productForm.setValue({
      name: 'Test Product',
      quantity: 10,
      unitPrice: 5.5
    });
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should call addProduct on submit when not in edit mode', () => {
    component.editMode = false;
    component.productForm.setValue({
      name: 'Test Product',
      quantity: 10,
      unitPrice: 5.5
    });

    component.onSubmit();
    expect(mockStore.addProduct).toHaveBeenCalledWith({
      name: 'Test Product',
      quantity: 10,
      unitPrice: 5.5
    });
  });

  it('should call updateProduct on submit when in edit mode', () => {
    component.editMode = true;
    component.selectedProduct = { id: 1, name: 'Test Product', quantity: 10, unitPrice: 5.5 };
    component.productForm.setValue({
      name: 'Test Product Updated',
      quantity: 20,
      unitPrice: 10
    });

    component.onSubmit();
    expect(mockStore.updateProduct).toHaveBeenCalledWith(1, {
      name: 'Test Product Updated',
      quantity: 20,
      unitPrice: 10
    });
  });

  it('should reset the form on cancel when not in edit mode', () => {
    component.editMode = false;
    component.productForm.setValue({
      name: 'Test Product',
      quantity: 10,
      unitPrice: 5.5
    });

    component.onCancel();
    expect(component.productForm.value).toEqual({
      name: null,
      quantity: null,
      unitPrice: null
    });
  });

  it('should patch the form with selectedProduct on cancel when in edit mode', () => {
    component.editMode = true;
    component.selectedProduct = { id: 1, name: 'Test Product', quantity: 10, unitPrice: 5.5 };
    component.productForm.setValue({
      name: 'Another Product',
      quantity: 5,
      unitPrice: 3
    });

    component.onCancel();
    expect(component.productForm.value).toEqual({
      name: 'Test Product',
      quantity: 10,
      unitPrice: 5.5
    });
  });
});
