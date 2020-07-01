import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CalculateBodyDto } from './dto/calculate.body.dto';
import { CalculateResponseDto } from './dto/calculate.response.dto';
import { CalculatorService } from './calculator.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('Calculator')
export class CalculatorController {
  constructor(private service: CalculatorService) {}
  @Post('/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CalculateResponseDto })
  calculate(@Body() body: CalculateBodyDto): CalculateResponseDto {
    return this.service.calculate();
  }
}
