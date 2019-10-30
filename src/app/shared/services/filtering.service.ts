import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class FilteringService {
  private items: any[];
  private filteredItems: BehaviorSubject<any[]>;

  get filteredData(): Observable<any[]> {
    return this.filteredItems.asObservable();
  }

  constructor() {}

  init(items: any[]) {
    this.items = items;
    this.filteredItems = new BehaviorSubject(this.items);
  }

  reset() {
    this.filteredItems.next(this.items);
  }

  includesString(key: string, term: string, subkey?: string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = subkey ? el[key][subkey] : el[key];
          return item.toLowerCase().includes(term.toLowerCase());
        })
      );
    }

    return this;
  }

  includesValue(key: string, term: string, subkey?: string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const arr = subkey ? el[key][subkey] : el[key];
          return arr.some(item =>
            item.toLowerCase().includes(term.toLowerCase())
          );
        })
      );
    }

    return this;
  }

  greaterOrEqual(
    key: string,
    term: number | string | Date,
    subkey?: string
  ): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = subkey ? el[key][subkey] : el[key];
          return item >= term;
        })
      );
    }

    return this;
  }

  lessOrEqual(
    key: string,
    term: number | string | Date,
    subkey?: string
  ): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = subkey ? el[key][subkey] : el[key];
          return item <= term;
        })
      );
    }

    return this;
  }

  equal(
    key: string,
    term: number | string | Date,
    subkey?: string
  ): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = subkey ? el[key][subkey] : el[key];
          return item === term;
        })
      );
    }

    return this;
  }
}
