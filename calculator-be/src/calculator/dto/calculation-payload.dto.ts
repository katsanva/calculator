import { Operations } from '../operations.enum';

import BigNumber from 'bignumber.js';

export class CalculationPayload {
  operation: Operations;
  left: BigNumber;
  right: BigNumber;
}
