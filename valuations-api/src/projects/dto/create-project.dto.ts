import { Currency } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(100)
    description?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    clientName: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    location?: string;

    @IsEnum(Currency)
    @IsOptional()
    currency?: Currency;

    @IsNumber()
    @IsOptional()
    amount?: number;
}
