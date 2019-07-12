import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethodEnum } from '../enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_value' })
  transactionValue: number;

  @Column({ name: 'payment_method', enum: PaymentMethodEnum, type: 'varchar' })
  paymentMethod: PaymentMethodEnum;

  @Column({ name: 'card_number' })
  cardNumber: string;

  @Column({ name: 'card_holder' })
  cardHolder: string;

  @Column({ name: 'card_expiration_date', type: 'float' })
  cardExpirationDate: number;

  @Column({ name: 'cvv' })
  cvv: string;
}
