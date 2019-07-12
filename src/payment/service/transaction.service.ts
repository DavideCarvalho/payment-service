import { EntityManager, Repository } from 'typeorm';
import { Transaction } from '../domain';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PaginatedResultDTO, PayableDTO, TransactionDTO } from '../dto';
import { deserializeArray, plainToClass } from 'class-transformer';
import { PayableService } from './payable.service';

export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly payableService: PayableService,
  ) {
  }

  public async createNewTransaction(transaction: TransactionDTO): Promise<TransactionDTO> {
    return this.entityManager.transaction(async transactionalManager => {
      const savedTransaction: Transaction = await transactionalManager.save(
        plainToClass<Transaction, TransactionDTO>(Transaction, transaction),
      );
      const payable = new PayableDTO(transaction.paymentMethod, transaction.transactionValue);
      await this.payableService.createPayable(payable);
      return plainToClass<TransactionDTO, Transaction>(TransactionDTO, savedTransaction);
    });
  }

  public async getTransactions(page: number, size: number): Promise<PaginatedResultDTO<TransactionDTO>> {
    const [transactions, totalElements] = await Promise.all<Transaction[], number>([
      this.repository.find({ take: size, skip: page * size }),
      this.repository.count(),
    ]);
    const transformedTransactions: TransactionDTO[] = deserializeArray<TransactionDTO>(TransactionDTO, JSON.stringify(transactions));
    return new PaginatedResultDTO<TransactionDTO>(transformedTransactions, page, size, totalElements);
  }
}
