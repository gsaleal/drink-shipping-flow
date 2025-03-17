import { ApiProperty } from "@nestjs/swagger";

export class NestedProductDto {
  id: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

export class ReadCustomerOrderResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  storeId: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  orderedAt: Date;

  @ApiProperty({ type: [NestedProductDto] })
  products: Array<NestedProductDto>;

  constructor(properties: ReadCustomerOrderResDto) {
    Object.assign(this, properties);
  }
}
