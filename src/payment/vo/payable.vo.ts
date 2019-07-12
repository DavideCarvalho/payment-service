import { PayableStatusEnum } from '../enum';
import { ApiModelProperty } from '@nestjs/swagger';

export class PayableVO {
  @ApiModelProperty({ enum: PayableStatusEnum, type: PayableStatusEnum, isArray: false })
  status: PayableStatusEnum;
  @ApiModelProperty()
  paymentDate: number;
  @ApiModelProperty()
  value: number;
  @ApiModelProperty()
  fee: number;
}
