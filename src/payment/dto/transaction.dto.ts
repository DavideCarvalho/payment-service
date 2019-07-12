import { PaymentMethodEnum } from '../enum';

export class TransactionDTO {
  id: number;
  transactionValue: number;
  paymentMethod: PaymentMethodEnum;
  cardNumber: string;
  cardHolder: string;
  cardExpirationDate: number;
  cvv: string;
}
