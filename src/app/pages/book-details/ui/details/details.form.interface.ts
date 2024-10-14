import { FormControl } from '@angular/forms';

export interface DetailsFormInterface {
  author: FormControl<string>;
  title: FormControl<string>;
  genre: FormControl<string>;
  date: FormControl<Date>;
  description: FormControl<string>;
}
