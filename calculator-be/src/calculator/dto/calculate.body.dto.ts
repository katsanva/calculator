import { Operations } from '../operations.enum';
import { ApiProperty } from '@nestjs/swagger';
import { getEnumValues } from '../../common/get-enum-values';

const BIGINTEGER_INPUT = '(-?\\d{1,}|Infinity)';

export class CalculateBodyDto {
  @ApiProperty({ enum: getEnumValues(Operations) })
  operation: Operations;
  @ApiProperty({ pattern: BIGINTEGER_INPUT })
  left: string;
  @ApiProperty({ pattern: BIGINTEGER_INPUT })
  right: string;
}
