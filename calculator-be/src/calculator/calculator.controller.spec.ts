import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';

describe('Calculator Controller', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
