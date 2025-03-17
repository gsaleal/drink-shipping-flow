import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateCustomerReqDto,
  CreateCustomerResDto,
} from './dtos/create-customer.dto';
import { CreateCustomerService } from './services/create.service';
import { ReadCustomersService } from './services/read.service';
import { ReadCustomerResDto } from './dtos/read-customer.dto';
import { DeleteCustomerService } from './services/delete.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerService: CreateCustomerService,
    private readonly readCustomerService: ReadCustomersService,
    private readonly deleteCustomerService: DeleteCustomerService,
  ) {}

  
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 201, type: CreateCustomerResDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerReqDto,
  ): Promise<CreateCustomerResDto> {
    return this.createCustomerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @ApiResponse({ status: 200, type: ReadCustomerResDto })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCustomersById(@Param('id') id: number): Promise<ReadCustomerResDto> {
    return this.readCustomerService.getById(id);
  }
  
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, type: ReadCustomerResDto, isArray: true })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomers(): Promise<Array<ReadCustomerResDto>> {
    return this.readCustomerService.getAll();
  }

  @ApiOperation({ summary: 'Delete customer' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCustomer(@Param('id') id: number): Promise<void> {
    return this.deleteCustomerService.delete(id);
  }

}
