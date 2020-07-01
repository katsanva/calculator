import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculate() {
    return { result: '' };
  }
}
