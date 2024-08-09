import { Injectable } from '@angular/core';
import { Category } from '../models/enum/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryMap: Record<Category, { color: string; icon: string }> = {
    [Category.Design]: { color: '#3498db', icon: 'bi-palette' },
    [Category.Development]: { color: '#519872', icon: 'bi-code-slash' },
    [Category.Marketing]: { color: '#F76F8E', icon: 'bi-megaphone' },
    [Category.Research]: { color: '#F38D68', icon: 'bi-search' },
    [Category.Testing]: { color: '#9b59b6', icon: 'bi-journal-check' },
    [Category.Operations]: { color: '#7FD8BE', icon: 'bi-gear' },
    [Category.Sales]: { color: '#FABC2A', icon: 'bi-cart' },
    [Category.Support]: { color: '#FFCAB1', icon: 'bi-headset' },
    [Category.Finance]: { color: '#A1FCDF', icon: 'bi-bar-chart' },
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
