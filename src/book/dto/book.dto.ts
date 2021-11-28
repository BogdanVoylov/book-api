import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class GetBookQueryDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class BookDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  author: string;
}

export class CreateBookDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  author: string;
}
