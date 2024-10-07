import { Component, OnInit } from '@angular/core';
import { BookDetailed } from '../../data-interfaces/book-detailed';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  DialogOverlayRef,
  DialogService,
  IGuiDialogOptions,
  SelectEnumType,
} from '@grotem-ui/grotem-ui-lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogDataService } from '../../services/dialog-data.service';
import { DetailsDialogType } from './details.model';
import {
  BookDetailedInfoMsg,
  ButtonTypeConstants,
  DetailsConstants,
  DialogTextConstants,
  GenreConstants,
} from './details.constants';
import { DetailsDialogComponent } from '../dialog/details-dialog.component';
import { take } from 'rxjs';
import { BookDetailsForm } from '../../data-interfaces/book-details-form';
import { BookDetailsNetworkService } from '../../services/book-details-network.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public detailedBook?: BookDetailed;
  public detailsForm!: FormGroup<BookDetailsForm>;
  protected readonly detailsStrings: any;
  private dialogRef!: DialogOverlayRef<DetailsDialogComponent, boolean>;
  public infoMsg?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private dataService: DialogDataService,
    private networkService: BookDetailsNetworkService,
  ) {
    this.detailsStrings = DetailsConstants;
  }

  public ngOnInit() {
    this.initForm();
    this.getBook();
  }

  private retrieveBook(id: string) {
    this.networkService.getBookById(id).subscribe((bookData) => {
      this.infoMsg = BookDetailedInfoMsg.loading;
      if ('title' in bookData && 'author' in bookData) {
        this.detailedBook = bookData;
        this.applyInitialDataToForm();
      } else if ('error' in bookData) {
        this.infoMsg = BookDetailedInfoMsg.error + ' Error: ' + bookData.error;
      } else {
        this.infoMsg = BookDetailedInfoMsg.error;
      }
    });
  }

  private getBook() {
    this.route.params.pipe(take(1)).subscribe((params: Params): void => {
      this.retrieveBook(params['id']);
    });
  }

  private initForm(): void {
    this.detailsForm = new FormGroup<BookDetailsForm>({
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

  private applyInitialDataToForm(): void {
    this.detailsForm?.controls.title.setValue(this.detailedBook!.title);
    this.detailsForm?.controls.author.setValue(this.detailedBook!.author);
    this.detailsForm?.controls.genre.setValue(this.detailedBook!.genre);
    this.detailsForm?.controls.date.setValue(new Date(this.detailedBook!.date));
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
    this.applyFormsToData();
    this.networkService
      .postUpdateBook(this.detailedBook!.id, this.detailedBook!)
      .subscribe((res) => {
        // TODO: Make popup or smth
        if ('msg' in res) {
          console.log(res.msg);
        } else if ('error' in res) {
          console.log(res.error);
        } else {
          console.log('Network error!');
        }
      });
  }

  private delete() {
    this.networkService
      .postDeleteBook(this.detailedBook!.id)
      .subscribe((res) => {
        if ('msg' in res) {
          console.log(res.msg);
          this.router.navigate(['..']);
        } else if ('error' in res) {
          console.log(res.error);
        } else {
          console.log('Network error!');
        }
      });
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
