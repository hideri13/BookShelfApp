import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BookSummary, PaginatorParams } from '../../domain';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@grotem-ui/grotem-ui-lib';
import { stockPaginatorOptions } from './list.constants';
import {
  BookListFacade,
  BookListState,
  LoadBookList,
  LoadBookListFailure,
  LoadBookListSuccess,
} from '../../core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
  ) {}

  public ngOnInit() {
    this.initPaginator();
    this.subscribeToBooksListDeprecated();
    // this.subscribeToBooksListLoad();
    // this.subscribeToBooksListSuccess();
    // this.subscribeToBooksListFailure();
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

  private subscribeToBooksListDeprecated(): void {
    this.facade.state$
      .pipe(takeUntil(this._destroy$))
      .subscribe((state: BookListState): void => {
        this.books = state.bookListState.value.books;
        this.paginatorParams.totalLength = state.bookListState.value.totalCount;
      });
  }

  //TODO: Fix infinite loop
  private subscribeToBooksListLoad(): void {
    this.facade.state$
      .byActions([LoadBookList])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        this.books = undefined;
        this.infoMsg = 'Loading';
      });
  }

  private subscribeToBooksListSuccess(): void {
    this.facade.state$
      .byActions([LoadBookListSuccess])
      .pipe(takeUntil(this._destroy$))
      .subscribe((state: BookListState): void => {
        this.books = state.bookListState.value.books;
        this.paginatorParams.totalLength = state.bookListState.value.totalCount;
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
      });
  }

  public onPageChange(pageEvent: PageEvent): void {
    this.paginatorParams.pageIndex = pageEvent.pageIndex;
    this.paginatorParams.pageSize = pageEvent.pageSize;
    this.facade.loadBooksList(
      this.paginatorParams.pageIndex,
      this.paginatorParams.pageSize,
    );
  }

  public openBook(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}

//TODO: Patch for Facade
