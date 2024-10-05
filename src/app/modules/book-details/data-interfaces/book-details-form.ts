import { FormControl } from '@angular/forms';

export interface BookDetailsForm {
  author: FormControl<string>;
  title: FormControl<string>;
  genre: FormControl<string>;
  date: FormControl<string>;
  description: FormControl<string>;
}
