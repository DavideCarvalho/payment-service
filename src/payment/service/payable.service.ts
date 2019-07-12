import { Payable } from '../domain';
import { PaginatedResultDTO, PayableDTO } from '../dto';
import { deserializeArray, plainToClass } from 'class-transformer';
import { PayableRepository } from '../repository/payable.repository';
import { PayableStatusEnum } from '../enum';
import { InjectRepository } from '@nestjs/typeorm';

export class PayableService {
  constructor(
    @InjectRepository(PayableRepository) private readonly repository: PayableRepository,
  ) {}

  public async createPayable(payable: PayableDTO): Promise<PayableDTO> {
    const savedPayable = await this.repository.save<Payable>(
      plainToClass<Payable, PayableDTO>(Payable, payable),
    );
    return plainToClass<PayableDTO, Payable>(PayableDTO, savedPayable);
  }

  public async getPayables(status: PayableStatusEnum, page: number, size: number): Promise<PaginatedResultDTO<PayableDTO>> {
    const [payables, payablesTotalQuantity]: [Payable[], number] = await this.repository.getPayablesByStatusPaginated(status, page, size);
    return new PaginatedResultDTO<PayableDTO>(deserializeArray<PayableDTO>(PayableDTO, JSON.stringify(payables)), page, size, payablesTotalQuantity);
  }
}
