import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CalculateBodyDto } from './dto/calculate.body.dto';
import { CalculateResponseDto } from './dto/calculate.response.dto';
import { CalculatorService } from './calculator.service';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { OperandsToBigintPipe } from 'src/common/operands-to-bigint.pipe';
import { CalculationPayload } from './dto/calculation-payload.dto';

@Controller()
@ApiTags('Calculator')
export class CalculatorController {
  constructor(private service: CalculatorService) {}
  @Post('/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CalculateResponseDto })
  @ApiBody({ type: CalculateBodyDto })
  calculate(
    @Body(OperandsToBigintPipe) payload: CalculateBodyDto,
  ): CalculateResponseDto {
    return {
      result: this.service.calculate(
        (payload as unknown) as CalculationPayload,
      ),
    };
  }
}
