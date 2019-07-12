import { IsNotEmpty } from 'class-validator';

export class PageableVO {
  @IsNotEmpty()
  page: number = 0;
  size: number = 10;
}
