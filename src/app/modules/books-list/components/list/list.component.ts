import { Component, OnInit } from '@angular/core';
import { BookSummary } from '../../data-interfaces/bookSummary';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@grotem-ui/grotem-ui-lib';
import { PaginatorParams } from '../../data-interfaces/PaginatorParams';
import { stockPaginatorOptions } from './list.constants';
import { BookListNetworkService } from '../../services/book-list-network.service';
import { BookPagedData } from '../../data-interfaces/network';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public books?: BookSummary[];
  public paginatorParams!: PaginatorParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private networkService: BookListNetworkService,
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
      .subscribe((bookData: BookPagedData) => {
        this.paginatorParams.totalLength = bookData.totalCount;
        this.books = bookData.books;
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
