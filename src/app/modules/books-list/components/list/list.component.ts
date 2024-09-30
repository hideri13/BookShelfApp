import { Component, OnInit } from '@angular/core';
import { Book } from '../data-interfaces/book';
import { sampleBooksData } from '../../../../../shared/sample-sata/sample-books-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public books?: Book[];

  constructor() {}

  public ngOnInit() {
    // TEMP
    this.books = sampleBooksData;
  }
}
