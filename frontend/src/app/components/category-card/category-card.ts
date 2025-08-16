import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../models/category.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [
    NgClass,
  ],
  templateUrl: './category-card.html',
  standalone: true,
  styleUrl: './category-card.scss'
})
export class CategoryCard {
  @Input() public category: Category;
  @Input() public isCategorySelected?: boolean = false;
  @Input() public showTag = true;
  @Output() public selection = new EventEmitter<Category>();

  public selectCategory() {
    this.selection.emit(this.category);
  }
}
