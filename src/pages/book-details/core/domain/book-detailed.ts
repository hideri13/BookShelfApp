export class BookDetailed {
  public id: string = '';
  public author: string = '';
  public title: string = '';
  public genre: string = '';
  public date: string = '';
  public description: string = '';

  constructor(params?: Partial<BookDetailed>) {
    this.id = params?.id ?? '';
    this.author = params?.author ?? '';
    this.title = params?.title ?? '';
    this.genre = params?.genre ?? '';
    this.date = params?.date ?? '';
    this.description = params?.description ?? '';
  }
}
