import { IsNotEmpty, IsInt, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "The Great Gatsby" })
    title: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "F. Scott Fitzgerald" })
    author: string

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ example: "1925" })
    publishedYear: number
}
