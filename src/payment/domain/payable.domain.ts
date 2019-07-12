import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PayableStatusEnum } from '../enum';

@Entity()
export class Payable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'status', enum: PayableStatusEnum, type: 'varchar' })
  status: PayableStatusEnum;

  @Column({ name: 'payment_date', type: 'float' })
  paymentDate: number;

  @Column({ name: 'value', type: 'float' })
  value: number;

  @Column({ name: 'fee', type: 'float' })
  fee: number;
}
