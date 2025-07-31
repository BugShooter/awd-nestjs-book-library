import { Expose } from '@nestjs/class-transformer';
import { IsInt, IsString, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBookDto {
  @Expose()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: 'string',
  })
  id: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author: string;

  @Expose()
  @IsInt()
  @ApiProperty({ example: 1925, type: 'integer' })
  publishedYear: number;
}
