import { CurrentPage } from './../models/currentPage';
import { Interval } from '@shared/models/interval';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class FilteringService {
  private limit: number;
  private items: any[];
  private filteredItems: BehaviorSubject<any[]>;
  private paginatedItems: BehaviorSubject<any[]>;
  private ready = new BehaviorSubject(false);

  afterInit = () => {};

  get isReady(): Observable<boolean> {
    return this.ready.asObservable();
  }

  get filteredData(): Observable<any[]> {
    return this.filteredItems.asObservable();
  }

  get paginatedData(): Observable<any[]> {
    return this.paginatedItems.asObservable();
  }

  get allItems(): any[] {
    return this.items;
  }

  constructor() {}

  init(items: any[], limit = 10) {
    this.items = items;
    this.limit = limit;
    this.filteredItems = new BehaviorSubject(this.items);
    this.paginatedItems = new BehaviorSubject(this.items.slice(0, this.limit));
    this.filteredData.subscribe(items =>
      this.paginatedItems.next(items.slice(0, this.limit))
    );

    this.afterInit();
    this.ready.next(true);
  }

  getUnique(key: string) {
    const unique = [
      ...new Set(
        this.items.map(item => {
          return this.getKeyValue(item, key);
        })
      )
    ];
    return unique;
  }

  reset() {
    this.filteredItems.next(this.items);
  }

  includesString(key: string, term: string): FilteringService {
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

  includesValue(key: string, term: string): FilteringService {
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

  greaterOrEqual(key: string, term: number | string): FilteringService {
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

  lessOrEqual(key: string, term: number | string): FilteringService {
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

  equal(key: string, term: number | string): FilteringService {
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

  onDate(key: string, term: Date): FilteringService {
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

  inTimePeriod(key: string, term: Interval): FilteringService {
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

  inFuture(key: string, term: Date): FilteringService {
    if (term) {
      this.filteredItems.next(
        this.filteredItems.value.filter(el => {
          const date = new Date(this.getKeyValue(el, key));
          return date >= term;
        })
      );
    }
    return this;
  }

  getItemsForPage(page: CurrentPage) {
    this.paginatedItems.next(
      this.filteredItems.value.slice(page.itemsStartIndex, page.itemsEndIndex)
    );
  }

  private getKeyValue(el: object, key: string) {
    let value = el;
    let keys = key.split('.');

    if (keys.length === 1) {
      return value[key];
    }

    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }

    return value;
  }
}
