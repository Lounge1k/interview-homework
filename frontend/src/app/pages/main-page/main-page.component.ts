import { Component, OnInit } from '@angular/core';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from '../items-list/items-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, AddItemFormComponent, ItemsListComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
