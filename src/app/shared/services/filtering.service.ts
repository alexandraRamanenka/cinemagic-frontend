import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {
  private items: any[];
  private filteredItems: any[];

  get filteredData(): any[] {
    return this.filteredItems;
  }

  constructor(items: any[]) {
    this.items = items;
  }

  includesString(key: string, term: string): FilteringService {
    this.filteredItems = this.items.filter(el => {
      return el[key].toLowerCase().includes(term.toLowerCase());
    });

    return this;
  }

  includesValue(key: string, term: any): FilteringService {
    this.filteredItems = this.items.filter(el => {
      const arr = el[key] as any[];
      return arr.includes(term);
    });

    return this;
  }

  greaterOrEqual(key: string, term: number | string | Date): FilteringService {
    this.filteredItems = this.items.filter(el => {
      return el[key] >= term;
    });

    return this;
  }

  equal(key: string, term: number | string | Date): FilteringService {
    this.filteredItems = this.items.filter(el => {
      return el[key] === term;
    });

    return this;
  }
}
