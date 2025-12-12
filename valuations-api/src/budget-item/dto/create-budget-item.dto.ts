import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBudgetItemDto {

    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    code: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsNotEmpty()
    @IsNumber()
    contractQty: number;

    @IsNotEmpty()
    @IsNumber()
    unitPrice: number;

    @IsOptional()
    @IsNumber()
    parentId?: number;

    @IsOptional()
    @IsString()
    parentCode?: string;

    @IsOptional()
    @IsNumber()
    level?: number;

    @IsOptional()
    @IsBoolean()
    isHeader?: boolean;

    @IsOptional()
    @IsNumber()
    sortOrder?: number;

}


