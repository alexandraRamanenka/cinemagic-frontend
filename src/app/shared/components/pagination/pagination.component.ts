import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrentPage } from '@shared/models/currentPage';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagesLimit = 10;
  @Input() limitPerPage = 10;
  @Input() totalItems: number;
  @Output() pageChanged = new EventEmitter<CurrentPage>();

  private currentPage = 1;

  get itemsStartIndex() {
    return (this.currentPage - 1) * this.limitPerPage;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.limitPerPage);
  }

  get pages(): number[] {
    const pages = [];
    for (
      let i = 0;
      i < this.pagesLimit && i + this.currentPage <= this.totalPages;
      i++
    ) {
      pages.push(i + this.currentPage);
    }

    return pages;
  }

  constructor() {}

  setPage(page) {
    this.currentPage =
      page <= this.totalPages && page >= 1 ? page : this.currentPage;
    this.pageChanged.emit(this.currentPageObject);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  private get currentPageObject(): CurrentPage {
    return {
      number: this.currentPage,
      itemsStartIndex: this.itemsStartIndex,
      itemsEndIndex: this.itemsStartIndex + this.limitPerPage
    };
  }
}
