import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CalculationPayload } from './dto/calculation-payload.dto';
import { Operations } from './operations.enum';

@Injectable()
export class CalculatorService {
  calculate({ operation, left, right }: CalculationPayload): string {
    switch (operation) {
      case Operations.Division: {
        return left.dividedBy(right).toString();
      }
      case Operations.Multiplication: {
        return left.multipliedBy(right).toString();
      }
      case Operations.Difference: {
        return left.minus(right).toString();
      }
      case Operations.Sum: {
        return left.plus(right).toString();
      }
      default: {
        throw new InternalServerErrorException(
          `Invalid operation requested: ${operation}`,
        );
      }
    }
  }
}
