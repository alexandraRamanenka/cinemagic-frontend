import { Observable, Subject } from 'rxjs';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() pagesLimit = 10;
  @Input() limitPerPage = 10;
  @Input() items$: Observable<any[]>;
  @Output() itemsSetChanged = new EventEmitter<any[]>();

  items: any[];
  totalItems: number;
  private currentPage = 1;
  private unsubscribe$: Subject<void> = new Subject<void>();

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

  ngOnInit() {
    this.items$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: items => {
        this.items = items;
        this.totalItems = this.items.length || 1;
        this.itemsSetChanged.emit(this.currentItemsSet);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPage(page) {
    this.currentPage =
      page <= this.totalPages && page >= 1 ? page : this.currentPage;
    this.itemsSetChanged.emit(this.currentItemsSet);
  }

  nextPage() {
    this.currentPage++;
    this.itemsSetChanged.emit(this.currentItemsSet);
  }

  prevPage() {
    this.currentPage--;
    this.itemsSetChanged.emit(this.currentItemsSet);
  }
}
