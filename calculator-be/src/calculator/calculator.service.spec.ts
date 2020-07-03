import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { Operations } from './operations.enum';
import BigNumber from 'bignumber.js';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should perform sum', () => {
    expect(
      service.calculate({
        operation: Operations.Sum,
        left: new BigNumber(1),
        right: new BigNumber(2),
      }),
    ).toBe('3');
  });

  it('should perform diff', () => {
    expect(
      service.calculate({
        operation: Operations.Difference,
        left: new BigNumber(1),
        right: new BigNumber(2),
      }),
    ).toBe('-1');
  });

  it('should perform multiply', () => {
    expect(
      service.calculate({
        operation: Operations.Multiplication,
        left: new BigNumber(1),
        right: new BigNumber(2),
      }),
    ).toBe('2');
  });

  it('should perform division', () => {
    expect(
      service.calculate({
        operation: Operations.Division,
        left: new BigNumber(1),
        right: new BigNumber(2),
      }),
    ).toBe('0.5');
  });
});
