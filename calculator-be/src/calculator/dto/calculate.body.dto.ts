import { Operations } from '../operations.enum';

export class CalculateBodyDto {
  operation: Operations;
  left: string;
  right: string;
}
