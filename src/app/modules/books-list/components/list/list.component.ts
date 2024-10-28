import { Component, OnInit } from '@angular/core';
import { Book } from '../../data-interfaces/book';
import { sampleBooksData } from '../../../../../shared/sample-sata/sample-books-data';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public books?: Book[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    // TEMP
    this.books = this.retrieveBooks();
  }

  private retrieveBooks() {
    return sampleBooksData;
  }

  public openBook(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
