import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { DetailsComponent } from '../ui';
import {
  ButtonModule,
  DatePickerModule,
  DialogModule,
  InputModule,
  SelectModule,
  TextareaModule,
} from '@grotem-ui/grotem-ui-lib';
import { DetailsDialogComponent } from '../ui/details/dialog';
import { BookDetailsFacade, DialogDataService } from '../core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsRepository } from '../data';

@NgModule({
  declarations: [DetailsComponent, DetailsDialogComponent],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputModule,
    SelectModule,
    DatePickerModule,
    FormsModule,
    TextareaModule,
    HttpClientModule,
  ],
  providers: [DialogDataService, BookDetailsRepository, BookDetailsFacade],
})
export class BookDetailsModule {}
