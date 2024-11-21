import { Component, OnInit } from '@angular/core';
import { DialogOverlayRef, DialogService } from '@grotem-ui/grotem-ui-lib';
import { DialogDataService } from '../../../core';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent implements OnInit {
  public content: string = '';

  constructor(
    public dialogRef: DialogOverlayRef,
    private readonly dialogService: DialogService,
    private dataService: DialogDataService,
  ) {}

  ngOnInit() {
    this.dataService
      .getData()
      .pipe(take(1))
      .subscribe((data) => {
        this.content = data;
      });
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Обработчик кнопки Закрыть
   */
  public close(): void {
    this.dialogRef.close(false);
  }
}
