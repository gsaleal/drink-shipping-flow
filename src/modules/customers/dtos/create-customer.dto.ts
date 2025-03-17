import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCustomerReqDto {
  @ApiProperty()
  @IsString()
  document: string;
  
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  socialName: string;
}

export class CreateCustomerResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  document: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  socialName: string;

  constructor(properties: CreateCustomerResDto) {
    Object.assign(this, properties);
  }
}
