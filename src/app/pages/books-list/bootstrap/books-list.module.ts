import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { ListComponent } from '../ui/list/list.component';
import { GuiPaginatorModule, GuiTableModule } from '@grotem-ui/grotem-ui-lib';
import { BookListRepository } from '../data';
import { HttpClientModule } from '@angular/common/http';
import { BookListFacade } from '../core';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    BooksListRoutingModule,
    GuiTableModule,
    GuiPaginatorModule,
    HttpClientModule,
  ],
  providers: [BookListRepository, BookListFacade],
})
export class BooksListModule {}
