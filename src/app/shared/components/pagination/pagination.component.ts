import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() limit = 10;
  @Input() pagesLimit = 10;
  @Input() totalItems = 0;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.limit);
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

  ngOnInit() {}

  setPage(page) {
    this.currentPage = page;
  }
}
