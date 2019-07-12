import { ApiModelProperty } from '@nestjs/swagger';
import { PayableVO } from '../vo';

export class GetPayablesSwaggerDTO {
  @ApiModelProperty({ type: PayableVO, isArray: true })
  content: PayableVO[];
  @ApiModelProperty()
  page: number;
  @ApiModelProperty()
  size: number;
  @ApiModelProperty()
  totalElements: number;
}
