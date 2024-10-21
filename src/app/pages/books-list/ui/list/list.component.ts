import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BookListFacade,
  BookListState,
  BookSummary,
  LoadBookListFailure,
  LoadBookListSuccess,
  PaginatorParams,
} from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@grotem-ui/grotem-ui-lib';
import { stockPaginatorOptions } from './list.constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  public books?: BookSummary[];
  public paginatorParams!: PaginatorParams;
  public infoMsg?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly facade: BookListFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.initPaginator();
    this.subscribeToBooksListSuccess();
    this.subscribeToBooksListFailure();
    this.loadBooks();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initPaginator(): void {
    this.paginatorParams = {
      pageIndex: stockPaginatorOptions.pageIndex,
      pageSize: stockPaginatorOptions.pageSize,
      pageSizeOptions: stockPaginatorOptions.pageSizeOptions,
      totalLength: stockPaginatorOptions.totalLength,
      hidePageSize: stockPaginatorOptions.hidePageSize,
    };
  }

  private subscribeToBooksListSuccess(): void {
    this.facade.state$
      .byActions([LoadBookListSuccess])
      .pipe(takeUntil(this._destroy$))
      .subscribe((state: BookListState): void => {
        this.books = state.bookListState.value.books;
        this.paginatorParams.totalLength = state.bookListState.value.totalCount;
        this.changeDetectorRef.detectChanges();
      });
  }

  private subscribeToBooksListFailure(): void {
    this.facade.state$
      .byActions([LoadBookListFailure])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        this.books = undefined;
        this.paginatorParams.totalLength = 0;
        this.infoMsg = `Load Error`;
        this.changeDetectorRef.detectChanges();
      });
  }

  public onPageChange(pageEvent: PageEvent): void {
    if (
      this.paginatorParams.pageIndex !== pageEvent.pageIndex ||
      this.paginatorParams.pageSize !== pageEvent.pageSize
    ) {
      this.paginatorParams.pageIndex = pageEvent.pageIndex;
      this.paginatorParams.pageSize = pageEvent.pageSize;
      this.loadBooks();
    }
  }

  private loadBooks(): void {
    this.facade.loadBooksList(
      this.paginatorParams.pageIndex,
      this.paginatorParams.pageSize,
    );
  }

  public openBook(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
