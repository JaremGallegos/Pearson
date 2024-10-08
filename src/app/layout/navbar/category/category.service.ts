import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, CategoryName } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    {
      icon: "border-all",
      displayName: "Todo",
      technicalName: "TODO",
      activated: false
    },
    {
      icon: "user",
      displayName: "Individual",
      technicalName: "INDIVIDUAL",
      activated: false
    },
    {
      icon: "user-group",
      displayName: "Doble",
      technicalName: "DOBLE",
      activated: false
    },
    {
      icon: "ring",
      displayName: "Matrimonial",
      technicalName: "MATRIMONIAL",
      activated: false
    },
    {
      icon: "children",
      displayName: "Twin",
      technicalName: "TWIN",
      activated: false
    },
    {
      icon: "users",
      displayName: "Triple",
      technicalName: "TRIPLE",
      activated: false
    },
    {
      icon: "people-roof",
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
      icon: "star",
      displayName: "Deluxe",
      technicalName: "DELUXE",
      activated: false
    },
    {
      icon: "tree",
      displayName: "Eco-Friendly",
      technicalName: "ECO-FRIENDLY",
      activated: false
    },
    {
      icon: "house-chimney",
      displayName: "Cabaña",
      technicalName: "CABAÑA",
      activated: false
    },
    {
      icon: "palette",
      displayName: "Temática",
      technicalName: "TEMÁTICA",
      activated: false
    },
    {
      icon: "mug-saucer",
      displayName: "Con Balcón",
      technicalName: "CON BALCÓN",
      activated: false
    },
    {
      icon: "bed",
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
