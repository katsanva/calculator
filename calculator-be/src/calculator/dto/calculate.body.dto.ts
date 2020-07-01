import { Operations } from '../operations.enum';
import { ApiProperty } from '@nestjs/swagger';
import { getEnumValues } from 'src/common/get-enum-values';

export class CalculateBodyDto {
  @ApiProperty({ enum: getEnumValues(Operations) })
  operation: Operations;
  @ApiProperty()
  left: string;
  @ApiProperty()
  right: string;
}
