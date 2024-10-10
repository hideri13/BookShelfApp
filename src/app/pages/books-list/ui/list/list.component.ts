import { Component, OnInit } from '@angular/core';
import { BookSummary } from '../../domain/book-summary';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@grotem-ui/grotem-ui-lib';
import { PaginatorParams } from '../../domain/paginator-params';
import { BookListInfoMsg, stockPaginatorOptions } from './list.constants';
import { BookListRepository } from '../../data';
import { BookPagedData } from '../../domain/book-paged-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public books?: BookSummary[];
  public paginatorParams!: PaginatorParams;
  public infoMsg?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private networkService: BookListRepository,
  ) {}

  public ngOnInit() {
    this.initPaginator();
    this.retrieveBooks();
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

  private retrieveBooks(): void {
    this.networkService
      .getBooks(this.paginatorParams.pageIndex, this.paginatorParams.pageSize)
      .subscribe((bookData: BookPagedData | Error) => {
        this.infoMsg = BookListInfoMsg.loading;
        if ('totalCount' in bookData && 'books' in bookData) {
          this.paginatorParams.totalLength = bookData.totalCount;
          this.books = bookData.books;
        } else if ('error' in bookData) {
          this.books = undefined;
          this.paginatorParams.totalLength = 0;
          this.infoMsg = BookListInfoMsg.error + ' Error: ' + bookData.error;
        } else {
          this.books = undefined;
          this.infoMsg = BookListInfoMsg.error;
        }
      });
  }

  public onPageChange(pageEvent: PageEvent): void {
    this.paginatorParams.pageIndex = pageEvent.pageIndex;
    this.paginatorParams.pageSize = pageEvent.pageSize;
    this.retrieveBooks();
  }

  public openBook(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}

//TODO: Patch for Facade
