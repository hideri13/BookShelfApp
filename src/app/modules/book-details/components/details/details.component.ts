import { Component, OnInit } from '@angular/core';
import { BookDetailed } from '../../data-interfaces/book-detailed';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { sampleBooksData } from '../../../../../shared/sample-sata/sample-books-data';
import {
  ButtonType,
  DatePickerDynamicFormControl,
  DialogOverlayRef,
  DialogService,
  DynamicForm,
  IGuiDialogOptions,
  InputDynamicFormControl,
  SelectDynamicFormControl,
  TextareaDynamicFormControl,
} from '@grotem-ui/grotem-ui-lib';
import { Validators } from '@angular/forms';
import { DialogDataService } from '../../services/dialog-data.service';
import { DetailsDialogType } from './details.model';
import { DialogTextConstants } from './details.constants';
import { DetailsDialogComponent } from '../dialog/details-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public detailedBook?: BookDetailed;
  public detailsForm!: DynamicForm;
  public readonly buttonSaveType!: ButtonType;
  public readonly buttonDeleteType!: ButtonType;

  private dialogRef!: DialogOverlayRef<DetailsDialogComponent, boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private dataService: DialogDataService,
  ) {
    this.buttonSaveType = 'primary';
    this.buttonDeleteType = 'danger';
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
    this.detailsForm = new DynamicForm('detailsForm', [
      new InputDynamicFormControl({
        key: 'title',
        label: 'Title',
        placeholder: 'title',
        validators: [Validators.required],
      }),
      new InputDynamicFormControl({
        key: 'author',
        label: 'Author',
        placeholder: 'author',
        validators: [Validators.required],
      }),
      new SelectDynamicFormControl({
        key: 'genre',
        label: 'Genre',
        placeholder: 'Pick genre',
        selectOptions: [
          { value: 'detective', label: 'detective' },
          { value: 'thriller', label: 'thriller' },
          { value: 'romance', label: 'romance' },
          { value: 'fantasy', label: 'fantasy' },
        ],
        validators: [Validators.required],
      }),
      new DatePickerDynamicFormControl({
        key: 'year',
        label: 'Pick year',
        validators: [Validators.required],
      }),
      new TextareaDynamicFormControl({
        key: 'description',
        label: 'Description',
        placeholder: 'Description',
      }),
    ]);
  }

  private applyInititalDataToForm(): void {
    this.detailsForm?.controls[0].setValue(this.detailedBook?.title);
    this.detailsForm?.controls[1].setValue(this.detailedBook?.author);
    this.detailsForm?.controls[2].setValue(this.detailedBook?.genre);
    this.detailsForm?.controls[3].setValue(this.detailedBook?.date);
    this.detailsForm?.controls[4].setValue(this.detailedBook?.description);
  }

  private applyFormsToData() {
    this.detailedBook!.title = this.detailsForm?.controls[0].formControl!.value;
    this.detailedBook!.author =
      this.detailsForm?.controls[1].formControl!.value;
    this.detailedBook!.genre = this.detailsForm?.controls[2].formControl!.value;
    this.detailedBook!.date = this.getDate(
      this.detailsForm?.controls[3].formControl!.value,
    );
    this.detailedBook!.description =
      this.detailsForm?.controls[4].formControl!.value;
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
      console.log(closingResult);
      console.log('button pressed');
    });
  }

  public formCreated() {
    this.applyInititalDataToForm();
  }

  private retrieveBook(id: number): BookDetailed {
    return sampleBooksData[id];
  }
}
