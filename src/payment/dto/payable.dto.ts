import { PayableStatusEnum, PaymentMethodEnum } from '../enum';

export class PayableDTO {
  status: PayableStatusEnum;
  paymentDate: number;
  private paymentMethod: PaymentMethodEnum;
  value: number;
  fee: number;

  constructor(paymentMethod: PaymentMethodEnum, value: number) {
    const [fee, taxedValue] = this.getFeeAndValueTaxed(paymentMethod, value);
    this.fee = fee;
    this.value = taxedValue;
    this.status = paymentMethod === PaymentMethodEnum.DEBIT_CARD
      ? PayableStatusEnum.PAID
      : PayableStatusEnum.WAITING_FUNDS;
    this.paymentDate = paymentMethod === PaymentMethodEnum.DEBIT_CARD
      ? new Date().getTime()
      : new Date().setTime(this.addThirtyDays(new Date()).getTime());
  }

  private getFeeAndValueTaxed(paymentMethod: PaymentMethodEnum, value: number): number[] {
    return paymentMethod === PaymentMethodEnum.DEBIT_CARD
      ? [...[], (value * 3) / 100, value - (value * 3) / 100]
      : [...[], (value * 5) / 100, value - (value * 5) / 100];
  }

  private addThirtyDays(date: Date): Date {
    return new Date(date.setDate(date.getDate() + 30));
  }
}
