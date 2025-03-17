import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, isString, IsString, MinLength } from "class-validator";

export class CreateStoreReqDto {

    @ApiProperty({ example: '12312312312' })
    @MinLength(14)
    @IsString()
    document: string;

    @ApiProperty({ example: 'Leal' })
    @MinLength(3)
    @IsString()
    socialName: string;

    @ApiProperty({ example: 'Gabriel' })
    @MinLength(3)
    @IsString()
    name: string;

    @ApiProperty({ example: 'example@email.com' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: '["31991919191", "31991919191"]' })
    @IsArray()
    phone: Array<string>;

    @ApiProperty({ example: '["Juan", "Augusto"]' })
    @MinLength(3, { each: true })
    @IsArray()
    representative: Array<string>;

    @ApiProperty({ example: 'Av. Brasil, 123, MG-BH' })
    @MinLength(3, { each: true })
    @IsArray()
    address: Array<string>; //todo COLOCAR O TIPO DE ENDERECO, PODE TER MAIS DE UM
}

export class CreateStoreResDto {
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
    address: Array<string>; //PODE TER MAIS DE UM

    constructor(properties: CreateStoreResDto) {
        Object.assign(this, properties);
    }
}