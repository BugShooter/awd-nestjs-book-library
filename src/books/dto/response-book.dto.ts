import { Expose } from "@nestjs/class-transformer"
import { IsInt, IsString, IsUUID } from "@nestjs/class-validator"

export class ResponseBookDto {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsString()
    title: string

    @Expose()
    @IsString()
    author: string

    @Expose()
    @IsInt()
    publishedYear: number
}
