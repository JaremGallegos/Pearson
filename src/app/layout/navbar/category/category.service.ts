import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, CategoryName } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    {
      icon: "eye",
      displayName: "Todo",
      technicalName: "TODO",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Individual",
      technicalName: "INDIVIDUAL",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Doble",
      technicalName: "DOBLE",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Matrimonial",
      technicalName: "MATRIMONIAL",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Twin",
      technicalName: "TWIN",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Triple",
      technicalName: "TRIPLE",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Familiar",
      technicalName: "FAMILIAR",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Con Vista al Mar",
      technicalName: "CON VISTA AL MAR",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Deluxe",
      technicalName: "DELUXE",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Eco-Friendly",
      technicalName: "ECO-FRIENDLY",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Cabaña",
      technicalName: "CABAÑA",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Temática",
      technicalName: "TEMÁTICA",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Con Balcón",
      technicalName: "CON BALCÓN",
      activated: false
    },
    {
      icon: "eye",
      displayName: "Loft",
      technicalName: "LOFT",
      activated: false
    }
  ];

  private changeCategory$ = new BehaviorSubject<Category>(this.getCategoryByDefault());
  changeCategoryObs = this.changeCategory$.asObservable();

  constructor() { }

  changeCategory(category: Category): void {
    this.changeCategory$.next(category);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryByDefault(): Category {
    return this.categories[0];
  }

  getCategoryByTechnicalName(technicalName: CategoryName): Category | undefined {
    return this.categories.find((category: Category) => category.technicalName === technicalName);
  }
}
