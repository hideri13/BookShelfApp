export interface BookDetailedData {
  id: string;
  author: string;
  title: string;
  genre: string;
  date: string;
  description: string;
}

export class BookDetailed implements BookDetailedData {
  public id: string = '';
  public author: string = '';
  public title: string = '';
  public genre: string = '';
  public date: string = '';
  public description: string = '';

  constructor(params?: Partial<BookDetailedData>) {
    this.id = params?.id ?? '';
    this.author = params?.author ?? '';
    this.title = params?.title ?? '';
    this.genre = params?.genre ?? '';
    this.date = params?.date ?? '';
    this.description = params?.description ?? '';
  }
}
