import { KeyPath } from './../models/keyPath';
import { Interval } from '@shared/models/interval';
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

  includesString(key: string | KeyPath, term: string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = this.getKeyValue(el, key);
          return item.toLowerCase().includes(term.toLowerCase());
        })
      );
    }

    return this;
  }

  includesValue(key: string | KeyPath, term: string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const arr = this.getKeyValue(el, key);
          return arr.some(item =>
            item.toLowerCase().includes(term.toLowerCase())
          );
        })
      );
    }

    return this;
  }

  greaterOrEqual(
    key: string | KeyPath,
    term: number | string
  ): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = this.getKeyValue(el, key);
          return item >= term;
        })
      );
    }

    return this;
  }

  lessOrEqual(key: string | KeyPath, term: number | string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = this.getKeyValue(el, key);
          return item <= term;
        })
      );
    }

    return this;
  }

  equal(key: string | KeyPath, term: number | string): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const item = this.getKeyValue(el, key);
          return item === term;
        })
      );
    }
    return this;
  }

  onDate(key: string | KeyPath, term: Date): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const date = new Date(this.getKeyValue(el, key));
          return (
            date.getFullYear() === term.getFullYear() &&
            date.getMonth() === term.getMonth() &&
            date.getDate() === term.getDate()
          );
        })
      );
    }
    return this;
  }

  inTimePeriod(key: string | KeyPath, term: Interval): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const time = new Date(this.getKeyValue(el, key));
          const minutes = time.getHours() * 60 + time.getMinutes();

          return minutes <= term.to && minutes >= term.from;
        })
      );
    }
    return this;
  }

  private getKeyValue(el: object, key: string | KeyPath) {
    let value = el;

    if (typeof key !== 'object') {
      return value[key];
    }

    while (typeof key === 'object') {
      value = value[Object.keys(key)[0]];
      key = key[Object.keys(key)[0]];
    }

    return value[key];
  }
}
