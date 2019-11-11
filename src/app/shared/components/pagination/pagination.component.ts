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

    if (this.totalPages <= this.pagesLimit) {
      return Array.from({ length: this.totalPages }, (v, i) => i + 1);
    }

    let half =
      this.limitPerPage % 2 === 1
        ? Math.round(this.limitPerPage / 2)
        : this.limitPerPage / 2 - 1;
    let startIndex = this.currentPage <= half ? 1 : this.currentPage - half + 1;
    let endIndex =
      this.currentPage >= this.totalPages - half
        ? this.totalPages
        : this.currentPage + half;

    for (let i = startIndex; i <= endIndex; i++) {
      pages.push(i);
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
