import { ApiModelProperty } from '@nestjs/swagger';
import { TransactionVO } from '../vo';

export class GetTransactionsSwaggerDTO {
  @ApiModelProperty({ type: TransactionVO, isArray: true })
  content: TransactionVO[];
  @ApiModelProperty()
  page: number;
  @ApiModelProperty()
  size: number;
  @ApiModelProperty()
  totalElements: number;
}
