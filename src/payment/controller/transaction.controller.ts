import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from '../service';
import { TransactionVO } from '../vo';
import { plainToClass } from 'class-transformer';
import { PaginatedResultDTO, TransactionDTO } from '../dto';
import { Roles, RolesGuard, ToNumberPipe } from '../../commons';
import { RolesEnum } from '../enum/roles.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiImplicitQuery, ApiOkResponse } from '@nestjs/swagger';
import { GetTransactionsSwaggerDTO } from '../swagger';

@Controller('transaction')
export class TransactionController {

  constructor(private service: TransactionService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(RolesEnum.GET_TRANSACTIONS)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: GetTransactionsSwaggerDTO, description: 'Transactions paginated'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiImplicitQuery({ name: 'page', required: false, type: Number, description: 'Page number - defaults to 0' })
  @ApiImplicitQuery({ name: 'size', required: false, type: Number, description: 'Page number - defaults to 10' })
  public async getTransactions(@Query('page', ToNumberPipe) page: number = 0,
                               @Query('size', ToNumberPipe) size: number = 10): Promise<PaginatedResultDTO<TransactionDTO>> {
    return await this.service.getTransactions(page, size);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesEnum.CREATE_NEW_TRANSACTION)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: TransactionDTO, description: 'Transaction created'})
  @ApiForbiddenResponse({ description: 'Forbidden'})
  public async createNewTransaction(@Body() transaction: TransactionVO): Promise<TransactionDTO> {
    return await this.service.createNewTransaction(
      plainToClass<TransactionDTO, TransactionVO>(TransactionDTO, transaction),
    );
  }
}
