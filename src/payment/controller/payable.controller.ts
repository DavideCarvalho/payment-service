import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { PayableService } from '../service/payable.service';
import { ToNumberPipe } from '../../commons/pipe';
import { PayableStatusEnum } from '../enum';
import { Roles } from '../../commons/decorator';
import { RolesEnum } from '../enum/roles.enum';
import { RolesGuard } from '../../commons/guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiImplicitQuery, ApiOkResponse } from '@nestjs/swagger';
import { GetPayablesSwaggerDTO } from '../swagger';
import { PaginatedResultVO, PayableStatusEnumVO, PayableVO } from '../vo';
import { deserializeArray } from 'class-transformer';

@Controller('payable')
export class PayableController {

  constructor(private service: PayableService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(RolesEnum.GET_PAYABLES)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetPayablesSwaggerDTO, description: 'Transactions paginated' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiImplicitQuery({ name: 'page', required: false, type: Number, description: 'Page number - defaults to 0' })
  @ApiImplicitQuery({ name: 'size', required: false, type: Number, description: 'Page number - defaults to 10' })
  @ApiImplicitQuery({ name: 'status', required: false, description: 'Payment status - must be AVAIALBLE or WAITING_FUNDS - defaults to AVAILABLE' })
  public async getPayables(@Query('status') status: PayableStatusEnumVO,
                           @Query('page', ToNumberPipe) page: number = 0,
                           @Query('size', ToNumberPipe) size: number = 10): Promise<PaginatedResultVO<PayableVO>> {
    const paymentStatus = status === PayableStatusEnumVO.WAITING_FUNDS
      ? PayableStatusEnum.WAITING_FUNDS
      : PayableStatusEnum.PAID;
    const { content, totalElements } = await this.service.getPayables(paymentStatus, page, size);
    return new PaginatedResultVO<PayableVO>(deserializeArray<PayableVO>(PayableVO, JSON.stringify(content)), page, size, totalElements);
  }
}
