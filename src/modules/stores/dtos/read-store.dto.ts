import { ApiProperty } from "@nestjs/swagger";

export class ReadStoreResDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    socialName: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: Array<string>;
    @ApiProperty()
    representative: Array<string>;
    @ApiProperty()
    address: Array<string>;
    constructor(properties: ReadStoreResDto) {
        Object.assign(this, properties);
    }
}