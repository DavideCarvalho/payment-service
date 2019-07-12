import { Payable } from '../domain';
import { EntityRepository, Repository } from 'typeorm';
import { PayableStatusEnum } from '../enum';

@EntityRepository(Payable)
export class PayableRepository extends Repository<Payable> {

  public async getPayablesByStatusPaginated(status: PayableStatusEnum, page: number, size: number): Promise<[Payable[], number]> {
    return await this.createQueryBuilder('payable')
      .where('payable.status = :status', { status })
      .skip(size * page)
      .limit(size)
      .getManyAndCount();
  }
}
