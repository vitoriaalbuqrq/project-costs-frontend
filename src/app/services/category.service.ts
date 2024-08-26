import { Injectable } from '@angular/core';
import { Category } from '../models/enum/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryMap: Record<Category, { color: string; icon: string }> = {
    [Category.Design]: { color: '#9b59b6', icon: 'bi-palette' },
    [Category.Development]: { color: '#1b7ae7', icon: 'bi-code-slash' },
    [Category.Marketing]: { color: '#F76F8E', icon: 'bi-megaphone' },
    [Category.Research]: { color: '#F38D68', icon: 'bi-search' },
    [Category.Testing]: { color: '#a543cc', icon: 'bi-journal-check' },
    [Category.Operations]: { color: '#3fb172', icon: 'bi-gear' },
    [Category.Sales]: { color: '#FABC2A', icon: 'bi-cart' },
    [Category.Support]: { color: '#803579', icon: 'bi-headset' },
    [Category.Finance]: { color: '#1cc4ad', icon: 'bi-bar-chart' },
    [Category.Other]: { color: '#34495e', icon: 'bi-question-circle' }
  };

  getCategoryInfo(category: string) {
    if (Object.values(Category).includes(category as Category)) {
      return this.categoryMap[category as Category];
    }
    return this.categoryMap[Category.Other];
  }

  getCategories(): Category[] {
    return Object.values(Category);
  }

  constructor() { }
}
