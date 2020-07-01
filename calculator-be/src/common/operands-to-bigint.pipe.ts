import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CalculateBodyDto } from 'src/calculator/dto/calculate.body.dto';
import { CalculationPayload } from 'src/calculator/dto/calculation-payload.dto';
import BigNumber from 'bignumber.js';

@Injectable()
export class OperandsToBigintPipe implements PipeTransform {
  transform(
    value: CalculateBodyDto,
    metadata: ArgumentMetadata,
  ): CalculationPayload {
    return {
      operation: value.operation,
      left: new BigNumber(value.left),
      right: new BigNumber(value.right),
    };
  }
}
