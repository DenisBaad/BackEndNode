export class PagedResult<T> {
  items: T[];
  totalCount: number;

  constructor(items: T[] = [], totalCount: number = 0) {
    this.items = items;
    this.totalCount = totalCount;
  }
}