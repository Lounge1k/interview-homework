import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Product } from '../../../core/models/warehouseItem';
import { Store } from 'src/app/services/store/store.service';
import { of } from 'rxjs';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    quantity: 5,
    unitPrice: 10.99
  };

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['setSelectedProduct', 'deleteProduct']);

    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.item = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information correctly', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('b')?.textContent).toBe('Test Product');
    expect(element.textContent).toContain('5x');
    expect(element.textContent).toContain('€10.99');
  });

  it('should call store.setSelectedProduct when edit button is clicked', () => {
    const editButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    editButton.click();
    expect(mockStore.setSelectedProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should call store.deleteProduct when delete button is clicked', () => {
    mockStore.deleteProduct.and.returnValue(of(undefined));
    const deleteButton = fixture.nativeElement.querySelector('button:nth-child(2)');
    deleteButton.click();
    expect(mockStore.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('should emit addToShipment event when called', () => {
    spyOn(component.addToShipment, 'emit');
    component.addToShipment.emit();
    expect(component.addToShipment.emit).toHaveBeenCalled();
  });

});