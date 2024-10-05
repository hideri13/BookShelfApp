import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { DetailsComponent } from './components/details/details.component';
import {
  ButtonModule,
  DialogModule,
  DynamicFormModule,
  InputModule,
  SelectModule,
} from '@grotem-ui/grotem-ui-lib';
import { DetailsDialogComponent } from './components/dialog/details-dialog.component';
import { DialogDataService } from './services/dialog-data.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsComponent, DetailsDialogComponent],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    DynamicFormModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputModule,
    SelectModule,
  ],
  providers: [
    DialogDataService,
    //DialogOverlayRef
  ],
})
export class BookDetailsModule {}
