import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BookDetailed,
  BookDetailedData,
  BookDetailsFacade,
  BookDetailsState,
  DeleteBookFailure,
  DeleteBookSuccess,
  DialogDataService,
  LoadBookDetailsFailure,
  LoadBookDetailsSuccess,
  UpdateBookDetailsFailure,
  UpdateBookDetailsSuccess,
} from '../../core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  DialogOverlayRef,
  DialogService,
  IGuiDialogOptions,
  SelectEnumType,
} from '@grotem-ui/grotem-ui-lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetailsDialogType } from './details.model';
import {
  ButtonTypeConstants,
  DetailsConstants,
  DialogTextConstants,
  GenreConstants,
} from './details.constants';
import { DetailsDialogComponent } from '../dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { DetailsFormInterface } from './details.form.interface';
import { BookDetailsRepository } from '../../data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _id?: string;
  public detailsForm!: FormGroup<DetailsFormInterface>;
  protected readonly detailsStrings: any;
  private dialogRef!: DialogOverlayRef<DetailsDialogComponent, boolean>;
  public loaded = false;
  public infoMsg: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly facade: BookDetailsFacade,
    private readonly dialogService: DialogService,
    private dataService: DialogDataService,
    private networkService: BookDetailsRepository,
    private readonly changeDectectionRef: ChangeDetectorRef,
  ) {
    this.detailsStrings = DetailsConstants;
  }

  public ngOnInit() {
    this.initForm();

    this.subscribeToLoadBookSuccess();
    this.subscribeToLoadBookFailure();
    this.subscribeToUpdateBookSuccess();
    this.subscribeToUpdateBookFailure();
    this.subscribeToDeleteBookSuccess();
    this.subscribeToDeleteBookFailure();

    this.getBook();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private retrieveBook() {
    this.facade.loadBookDetails(this._id!);
  }

  private getBook() {
    this.route.params.pipe(take(1)).subscribe((params: Params): void => {
      this._id = params['id'];
      this.retrieveBook();
    });
  }

  private subscribeToLoadBookSuccess(): void {
    this.facade.state$
      .byActions([LoadBookDetailsSuccess])
      .pipe(takeUntil(this._destroy$))
      .subscribe((state: BookDetailsState): void => {
        this.applyDataToForm(state.bookDetailsState.value);
        this.loaded = true;
        console.log('Load Data Successful');
        this.changeDectectionRef.detectChanges();
      });
  }

  private subscribeToLoadBookFailure(): void {
    this.facade.state$
      .byActions([LoadBookDetailsFailure])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        this.infoMsg = 'Book Load Error';
        this.changeDectectionRef.detectChanges();
      });
  }

  private subscribeToUpdateBookSuccess(): void {
    this.facade.state$
      .byActions([UpdateBookDetailsSuccess])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        console.log('Updated Successfully');
      });
  }

  private subscribeToUpdateBookFailure(): void {
    this.facade.state$
      .byActions([UpdateBookDetailsFailure])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        console.log('Update Error!');
      });
  }

  private subscribeToDeleteBookSuccess(): void {
    this.facade.state$
      .byActions([DeleteBookSuccess])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        console.log('Book deleted successfully!');
        this.router.navigate(['..']);
      });
  }

  private subscribeToDeleteBookFailure(): void {
    this.facade.state$
      .byActions([DeleteBookFailure])
      .pipe(takeUntil(this._destroy$))
      .subscribe((): void => {
        console.log('Delete Book Error!');
      });
  }

  private initForm(): void {
    this.detailsForm = new FormGroup<DetailsFormInterface>({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      author: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      genre: new FormControl<string>('', { nonNullable: true }),
      date: new FormControl<Date>(new Date(), { nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
    });
  }

  private applyDataToForm(book: BookDetailed): void {
    this.detailsForm?.controls.title.setValue(book.title);
    this.detailsForm?.controls.author.setValue(book.author);
    this.detailsForm?.controls.genre.setValue(book.genre);
    this.detailsForm?.controls.date.setValue(new Date(book.date));
    this.detailsForm?.controls.description.setValue(book.description);
  }

  private formsToBook(): BookDetailed {
    return new BookDetailed(<BookDetailedData>{
      id: this._id,
      author: this.detailsForm?.controls.author.value,
      title: this.detailsForm?.controls.title.value,
      genre: this.detailsForm?.controls.genre.value,
      date: this.getDate(this.detailsForm?.controls.date.value),
      description: this.detailsForm?.controls.description.value,
    });
  }

  private getDate(date: Date): string {
    let mo: number = date.getMonth() + 1;
    let day: number = date.getDate();
    return `${date.getFullYear()}-${mo < 10 ? '0' + `${mo}` : `${mo}`}-${
      day < 10 ? '0' + `${day}` : `${day}`
    }`;
  }

  public onSave() {
    this.openDialog(DetailsDialogType.save);
  }

  public onDelete() {
    this.openDialog(DetailsDialogType.delete);
  }

  private save() {
    this.facade.updateBookDetails(this._id!, this.formsToBook());
  }

  private delete() {
    this.facade.deleteBook(this._id!);
  }

  private openDialog(type: DetailsDialogType): void {
    const dialogOptions: IGuiDialogOptions<DetailsDialogComponent> = {
      title: 'Confirm',
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

  protected readonly SelectEnumType = SelectEnumType;
  protected readonly ButtonTypeConstants = ButtonTypeConstants;
  protected readonly GenreConstants = GenreConstants;
}
