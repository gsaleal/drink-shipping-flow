import { ApiProperty } from "@nestjs/swagger";

export class ReadCustomerResDto  {

    @ApiProperty()
    id: number;

    @ApiProperty()
    document: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    socialName: string;
    constructor(properties: ReadCustomerResDto) {
        Object.assign(this, properties);
    }
}