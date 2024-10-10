import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { DetailsComponent } from './components/details/details.component';
import {
  ButtonModule,
  DatePickerModule,
  DialogModule,
  InputModule,
  SelectModule,
  TextareaModule,
} from '@grotem-ui/grotem-ui-lib';
import { DetailsDialogComponent } from './components/dialog/details-dialog.component';
import { DialogDataService } from './services/dialog-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsNetworkService } from './services/book-details-network.service';

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
  providers: [DialogDataService, BookDetailsNetworkService],
})
export class BookDetailsModule {}
