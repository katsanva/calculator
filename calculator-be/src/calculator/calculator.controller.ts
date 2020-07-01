import { Controller, Post, Body } from '@nestjs/common';
import { CalculateBodyDto } from './dto/calculate.body.dto';
import { CalculateResponseDto } from './dto/calculate.response.dto';
import { CalculatorService } from './calculator.service';

@Controller()
export class CalculatorController {
  constructor(private service: CalculatorService) {}
  @Post('/calculate')
  calculate(@Body() body: CalculateBodyDto): CalculateResponseDto {
    return this.service.calculate();
  }
}
