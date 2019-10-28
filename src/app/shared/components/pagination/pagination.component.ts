import { PaginationService } from '@shared/services/pagination.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagesLimit = 10;

  get limit(): number {
    return this.paginationService.limitPerPage;
  }

  get totalItems(): number {
    return this.paginationService.totalItems;
  }

  get totalPages(): number {
    return this.paginationService.totalPages;
  }

  get currentPage(): number {
    return this.paginationService.currentPage;
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

  constructor(private paginationService: PaginationService) {}

  setPage(page) {
    this.paginationService.currentPage = page;
  }

  nextPage() {
    this.paginationService.nextPage();
  }

  prevPage() {
    this.paginationService.prevPage();
  }
}
