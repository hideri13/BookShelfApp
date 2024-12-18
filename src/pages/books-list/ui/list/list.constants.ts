import { IPaginatorParams } from './paginator-params.interface';

export const stockPaginatorOptions: IPaginatorParams = <IPaginatorParams>{
  pageSize: 25,
  pageIndex: 0,
  pageSizeOptions: [5, 10, 15, 20, 25, 30, 50, 100, 200],
  totalLength: 0,
  hidePageSize: false,
};
