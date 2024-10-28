import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { GuiPaginatorModule, GuiTableModule } from '@grotem-ui/grotem-ui-lib';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    BooksListRoutingModule,
    GuiTableModule,
    GuiPaginatorModule,
  ],
})
export class BooksListModule {}
