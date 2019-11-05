import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() pagesLimit = 10;
  @Input() limitPerPage = 10;
  @Input() totalItems: number;
  @Output() pageChanged = new EventEmitter<number>();

  private currentPage = 1;

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

  get pagesSet(): number[] {
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
    this.pageChanged.emit(this.currentPage);
  }

  nextPage() {
    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }

  prevPage() {
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }
}
