import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  items: any[] = [];
  totalItems = 1;
  limitPerPage = 10;
  private currPage = 1;

  set currentPage(page) {
    this.currPage = page <= this.totalPages && page >= 1 ? page : this.currPage;
  }

  get currentPage(): number {
    return this.currPage;
  }

  get currentItemsSet(): any[] {
    const startItemIndex = (this.currentPage - 1) * this.limitPerPage;
    const itemSet = this.items.slice(
      startItemIndex,
      startItemIndex + this.limitPerPage
    );

    return itemSet;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.limitPerPage);
  }

  constructor() {}

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    this.currentPage--;
  }
}
