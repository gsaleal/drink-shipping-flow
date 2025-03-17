import { ApiProperty } from "@nestjs/swagger";

export class ReadProductResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  price: number;

  constructor(properties: ReadProductResDto) {
    Object.assign(this, properties);
  }
}
