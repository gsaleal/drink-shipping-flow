import {
  IsInt,
  ValidateNested,
  Min,
  IsArray,
  MinLength,
} from 'class-validator';
import { Product } from '../../products/models/product.model';
import { ApiProperty } from '@nestjs/swagger';

export class NestedProductDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;
}


export class CreateCustomerOrderReqDto {
  @ApiProperty({ type: [NestedProductDto] })
  @ValidateNested()
  @IsArray()
  products: Array<NestedProductDto>;
}

export class CreateCustomerOrderResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  totalPrice: number;
  
  @ApiProperty()
  totalItems: number;

  @ApiProperty({ type: [Product] })
  products: Product[];

  @ApiProperty()
  orderedAt: Date;

  constructor(properties: CreateCustomerOrderResDto) {
    Object.assign(this, properties);
  }
}
