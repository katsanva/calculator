import { Operations } from '../operations.enum';
import { ApiProperty } from '@nestjs/swagger';
import { getEnumValues } from 'src/common/get-enum-values';

const BIGINTEGER_INPUT = '(-?\\d{1,}|Infinity)';

export class CalculateBodyDto {
  @ApiProperty({ enum: getEnumValues(Operations) })
  operation: Operations;
  @ApiProperty({ maxLength: 22, pattern: BIGINTEGER_INPUT })
  left: string;
  @ApiProperty({ maxLength: 22, pattern: BIGINTEGER_INPUT })
  right: string;
}
