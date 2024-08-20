import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { Store } from 'src/app/services/store/store.service';
import { of } from 'rxjs';
import { Product } from '../../core/models/warehouseItem';
import { By } from '@angular/platform-browser';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', quantity: 5, unitPrice: 10 },
    { id: 2, name: 'Product 2', quantity: 3, unitPrice: 20 },
  ];

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['fetchProducts', 'getAllProducts', 'setSelectedProduct']);
    mockStore.fetchProducts.and.returnValue(of([]));
    mockStore.getAllProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [ItemsListComponent, ListItemComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items in ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.fetchProducts).toHaveBeenCalled();
    expect(mockStore.getAllProducts).toHaveBeenCalled();
    component.items.subscribe(items => {
      expect(items).toEqual(mockProducts);
    });
  });

  it('should render ListItemComponents for each item', () => {
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.directive(ListItemComponent));
    expect(listItems.length).toBe(mockProducts.length);
  });

  it('should call addItem when Add item button is clicked', () => {
    spyOn(component, 'addItem');
    fixture.detectChanges();
    const addButton = fixture.debugElement.query(By.css('.btn-primary'));
    addButton.triggerEventHandler('click', null);
    expect(component.addItem).toHaveBeenCalled();
  });

  it('should call setSelectedProduct with undefined when addItem is called', () => {
    component.addItem();
    expect(mockStore.setSelectedProduct).toHaveBeenCalledWith(undefined);
  });

  it('should call setSelectedProduct with item when editItem is called', () => {
    const testProduct = mockProducts[0];
    component.editItem(testProduct);
    expect(mockStore.setSelectedProduct).toHaveBeenCalledWith(testProduct);
  });
});