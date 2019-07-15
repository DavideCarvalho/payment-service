import { PaymentMethodEnum } from '../enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TransactionVO {
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  transactionValue: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  @ApiModelProperty({ enum: PaymentMethodEnum, type: PaymentMethodEnum, isArray: false })
  paymentMethod: PaymentMethodEnum;

  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  @ApiModelProperty({ type: String, exclusiveMinimum: 16, exclusiveMaximum: 16 })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  cardHolder: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  cardExpirationDate: number;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  cvv: string;
}
