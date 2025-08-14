import {Component, Input} from '@angular/core';
import {Category} from '../../models/category.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [
    NgClass
  ],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss'
})
export class CategoryCard {
  @Input() public category?: Category;

}
