import { Module } from '@nestjs/common';
import { PayableController, TransactionController } from './controller';
import { TransactionService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payable, Transaction } from './domain';
import { PayableService } from './service/payable.service';
import { PayableRepository } from './repository/payable.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Payable, PayableRepository]),
  ],
  controllers: [TransactionController, PayableController],
  providers: [TransactionService, PayableService],
})
export class PaymentModule {}
