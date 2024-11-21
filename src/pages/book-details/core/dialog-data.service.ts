import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogDataService {
  constructor() {}

  private data: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public setData(data: string) {
    this.data.next(data);
  }

  public getData() {
    return this.data.asObservable();
  }
}
