import { Component, OnInit } from '@angular/core';
import { BookDetailed } from '../../data-interfaces/book-detailed';
import { ActivatedRoute, Params } from '@angular/router';
import { sampleBooksDetailedData } from '../../../../../shared/sample-sata/sample-books-detailed-data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public detailedBook?: BookDetailed;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      this.detailedBook = this.retrieveBook(params['id']);
    });
  }

  private retrieveBook(id: number): BookDetailed {
    return sampleBooksDetailedData[id];
  }
}
