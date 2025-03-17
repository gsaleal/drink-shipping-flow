import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import {
    CreateCustomerOrderReqDto,
    CreateCustomerOrderResDto,
  } from './dtos/create-customer-order.dto';
  import { CreateCustomerOrderService } from './services/create.service';
  import { StoreHeaderDto } from '../stores/dtos/header.dto';
  import { RequestHeader } from '../../decorators/request-header.decorator';
  import { ReadCustomerOrderService } from './services/read.service';
  import { ReadCustomerOrderResDto } from './dtos/read-customer-order.dto';
  import { CustomerExistsGuard } from './../../guards/customer-exists.guard';
  import {StoreExistsGuard} from '../../guards/store-exists.guard';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @Controller('customers/:customerId/orders')
  export class CustomerOrdersController {
    constructor(
      private readonly createCustomerOrderService: CreateCustomerOrderService,
      private readonly readCustomerOrderService: ReadCustomerOrderService,
    ) {}
  
    @ApiOperation({ summary: 'Create customer order' })
    @ApiResponse({ status: 201, type: CreateCustomerOrderResDto })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(StoreExistsGuard, CustomerExistsGuard)
    async createCustomerOrder(
      @Body() createCustomerOrderReqDto: CreateCustomerOrderReqDto,
      @Param('customerId') customerId: string,
      @RequestHeader(StoreHeaderDto) headers: StoreHeaderDto,
    ): Promise<CreateCustomerOrderResDto> {
      return this.createCustomerOrderService.create(
        headers['x-store-id'],
        Number(customerId),
        createCustomerOrderReqDto,
      );
    }
  
    @ApiOperation({ summary: 'Get customer orders' })
    @ApiResponse({ status: 200, type: [ReadCustomerOrderResDto] })
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(StoreExistsGuard, CustomerExistsGuard)
    async getCustomerOrder(
      @Param('customerId') customerId: string,
      @RequestHeader(StoreHeaderDto) headers: StoreHeaderDto,
    ): Promise<Array<ReadCustomerOrderResDto>> {
      return this.readCustomerOrderService.getAll(
        headers['x-store-id'],
        Number(customerId),
      );
    }
  
    @ApiOperation({ summary: 'Get customer order by id' })
    @ApiResponse({ status: 200, type: ReadCustomerOrderResDto })
    @Get(':orderId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(StoreExistsGuard, CustomerExistsGuard)
    async getCustomerOrderById(
      @Param('customerId') customerId: string,
      @Param('orderId') customerOrderId: string,
      @RequestHeader(StoreHeaderDto) headers: StoreHeaderDto,
    ): Promise<ReadCustomerOrderResDto> {
      return this.readCustomerOrderService.getById(
        headers['x-store-id'],
        Number(customerId),
        Number(customerOrderId),
      );
    }
  }
  