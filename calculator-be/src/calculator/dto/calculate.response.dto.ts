import { ApiProperty } from '@nestjs/swagger';

export class CalculateResponseDto {
  @ApiProperty()
  result: string;
}
