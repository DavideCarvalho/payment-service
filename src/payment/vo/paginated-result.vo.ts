export class PaginatedResultVO<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;

  constructor(content: T[], page: number, size: number, totalElements: number) {
    this.content = content;
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
  }
}
