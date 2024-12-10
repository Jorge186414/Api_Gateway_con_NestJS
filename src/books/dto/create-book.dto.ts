
import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateBookDto {

   @IsString()
   public isbn: string

   @IsString()
   public titulo: string

   @IsString()
   public tipo: string

   @IsString()
   public autor: string

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public status: number

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public genero: number

   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   public categoria: number

}
