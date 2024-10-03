import { Component, OnInit } from '@angular/core';
import { Book } from '../../data-interfaces/book';
import { sampleBooksData } from '../../../../../shared/sample-sata/sample-books-data';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@grotem-ui/grotem-ui-lib';
import { PaginatorParams } from '../../data-interfaces/PaginatorParams';
import { stockPaginatorOptions } from './list.constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public books?: Book[];
  public paginatorParams!: PaginatorParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.initPaginator();
    let requestData = this.retrieveBooks();
    this.paginatorParams.totalLength = requestData.totalLength;
    this.books = requestData.data;
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

  private retrieveBooks() {
    //Server job emulation
    let pageNumber = this.paginatorParams.pageIndex;
    let pageSize = this.paginatorParams.pageSize;
    let totalLength = sampleBooksData.length;
    let start = pageNumber * pageSize;
    let end = start + pageSize;
    return {
      totalLength: totalLength,
      data: sampleBooksData.slice(start, end),
    };
  }

  public onPageChange(pageEvent: PageEvent): void {
    this.paginatorParams.pageIndex = pageEvent.pageIndex;
    this.paginatorParams.pageSize = pageEvent.pageSize;
    this.paginatorParams.totalLength = pageEvent.length;
    //pageEvent.previousPageIndex
    let tmp = this.retrieveBooks();
    this.paginatorParams.totalLength = tmp.totalLength;
    this.books = tmp.data;
  }

  public openBook(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
