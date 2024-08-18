import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MainPageComponent } from './main-page.component';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { ItemsListComponent } from '../items-list/items-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MainPageComponent,       // Import the standalone component directly
        AddItemFormComponent,    // Import AddItemFormComponent as it is used in the template
        ItemsListComponent,       // Import ItemsListComponent as it is used in the template
        HttpClientTestingModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain AddItemFormComponent', () => {
    const addItemFormElement = fixture.debugElement.query(By.css('app-add-item-form'));
    expect(addItemFormElement).toBeTruthy();
  });

  it('should contain ItemsListComponent', () => {
    const itemsListElement = fixture.debugElement.query(By.css('app-items-list'));
    expect(itemsListElement).toBeTruthy();
  });
});