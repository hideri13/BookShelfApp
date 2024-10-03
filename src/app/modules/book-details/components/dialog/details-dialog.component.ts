import { Component, OnInit } from '@angular/core';
import { DialogOverlayRef, DialogService } from '@grotem-ui/grotem-ui-lib';
import { DialogDataService } from '../../services/dialog-data.service';

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
    this.dataService.getData().subscribe((data) => {
      this.content = data;
    });
  }

  public confirm(): void {
    this.dialogRef.close('Saved');
  }

  /**
   * Обработчик кнопки Закрыть
   */
  public close(): void {
    this.dialogRef.close('Closed without saving');
  }
}
