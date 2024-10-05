import { Component, OnInit } from '@angular/core';
import { BookDetailed } from '../../data-interfaces/book-detailed';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { sampleBooksData } from '../../../../../shared/sample-sata/sample-books-data';
import {
  ButtonType,
  DialogOverlayRef,
  DialogService,
  IGuiDialogOptions,
} from '@grotem-ui/grotem-ui-lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogDataService } from '../../services/dialog-data.service';
import { DetailsDialogType } from './details.model';
import { DetailsConstants, DialogTextConstants } from './details.constants';
import { DetailsDialogComponent } from '../dialog/details-dialog.component';
import { take } from 'rxjs';
import { BookDetailsForm } from '../../data-interfaces/book-details-form';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public detailedBook?: BookDetailed;
  public detailsForm!: FormGroup<BookDetailsForm>;
  public readonly buttonSaveType!: ButtonType;
  public readonly buttonDeleteType!: ButtonType;
  protected readonly detailsStrings: any;
  private dialogRef!: DialogOverlayRef<DetailsDialogComponent, boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private dataService: DialogDataService,
  ) {
    this.buttonSaveType = 'primary';
    this.buttonDeleteType = 'danger';
    this.detailsStrings = DetailsConstants;
  }

  public ngOnInit() {
    this.initForm();
    this.route.params
      .pipe(
        // tap(
        //   ((id: string, c: Console): object => ({
        //     subscribe: (): void =>
        //       c.log(
        //         `%c> ${id} subscribe`,
        //         'background-color:lime;color:black;padding:3px;',
        //       ),
        //     next: (v: unknown): void =>
        //       c.log(
        //         `%c> ${id} next`,
        //         'background-color:aqua;color:black;padding:3px;',
        //         v,
        //       ),
        //     error: (e: unknown): void =>
        //       c.log(
        //         `%c> ${id} error`,
        //         'background-color:red;color:black;padding:3px;',
        //         e,
        //       ),
        //     complete: (): void =>
        //       c.log(
        //         `%c> ${id} complete`,
        //         'background-color:aqua;color:black;padding:3px;',
        //       ),
        //     unsubscribe: (): void =>
        //       c.log(
        //         `%c> ${id} unsubscribe`,
        //         'background-color:magenta;color:black;padding:3px;',
        //       ),
        //     finalize: (): void =>
        //       c.log(
        //         `%c> ${id} finalize`,
        //         'background-color:salmon;color:black;padding:3px;',
        //       ),
        //   }))('1', window.console),
        // ),
        take(1),
      )
      .subscribe((params: Params): void => {
        this.detailedBook = this.retrieveBook(params['id']);
      });
  }

  private initForm(): void {
    this.detailsForm = new FormGroup<BookDetailsForm>({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      author: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      genre: new FormControl<string>('', { nonNullable: true }),
      date: new FormControl<string>('', { nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
    });
  }

  private applyInititalDataToForm(): void {
    // TODO: Handle async
    this.detailsForm?.controls.title.setValue(this.detailedBook!.title);
    this.detailsForm?.controls.author.setValue(this.detailedBook!.author);
    this.detailsForm?.controls.genre.setValue(this.detailedBook!.genre);
    this.detailsForm?.controls.date.setValue(this.detailedBook!.date);
    this.detailsForm?.controls.description.setValue(
      this.detailedBook!.description,
    );
  }

  private applyFormsToData() {
    this.detailedBook!.title = this.detailsForm?.controls.title.value;
    this.detailedBook!.author = this.detailsForm?.controls.author.value;
    this.detailedBook!.genre = this.detailsForm?.controls.genre.value;
    this.detailedBook!.date = this.getDate(
      this.detailsForm?.controls.date.value,
    );
    this.detailedBook!.description =
      this.detailsForm?.controls.description.value;
  }

  private getDate(str: string): string {
    let date: Date = new Date(str);
    let mo: number = date.getMonth() + 1;
    let day: number = date.getDate();
    return `${date.getFullYear()}-${mo < 10 ? '0' + `${mo}` : `${mo}`}-${
      day < 10 ? '0' + `${day}` : `${day}`
    }`;
  }

  private postData(): void {
    sampleBooksData[this.detailedBook!.id].title = this.detailedBook!.title;
    sampleBooksData[this.detailedBook!.id].author = this.detailedBook!.author;
    sampleBooksData[this.detailedBook!.id].genre = this.detailedBook!.genre;
    sampleBooksData[this.detailedBook!.id].date = this.detailedBook!.date;
    sampleBooksData[this.detailedBook!.id].description =
      this.detailedBook!.description;
  }

  public onSave() {
    this.openDialog(DetailsDialogType.save);
  }

  public onDelete() {
    this.openDialog(DetailsDialogType.delete);
  }

  private save() {
    this.applyFormsToData();
    this.postData();
  }

  private delete() {
    sampleBooksData.splice(this.detailedBook!.id, 1);
    this.router.navigate(['..']);
  }

  private openDialog(type: DetailsDialogType): void {
    const dialogOptions: IGuiDialogOptions<DetailsDialogComponent> = {
      title: 'My dialog',
      contentComponent: DetailsDialogComponent,
      width: '37.5rem',
      type: 'confirm',
    };

    this.dataService.setData(
      type === DetailsDialogType.save
        ? DialogTextConstants.save
        : DialogTextConstants.delete,
    );

    this.dialogRef = this.dialogService.open(dialogOptions);
    this.dialogRef.afterClosed$.subscribe((closingResult: boolean) => {
      if (closingResult) {
        if (type === DetailsDialogType.save) {
          this.save();
        } else {
          this.delete();
        }
      }
    });
  }

  public formCreated() {
    this.applyInititalDataToForm();
  }

  private retrieveBook(id: number): BookDetailed {
    return sampleBooksData[id];
  }
}
