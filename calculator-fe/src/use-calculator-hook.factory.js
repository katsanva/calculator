import {
  ZERO,
  DEFAULT_VALUE,
  SEPARATOR,
  SYMBOLS_LIMIT,
  NAN_DISPLAY,
} from "./constants";

const setOperand = (acc, symbol, set) => {
  if (acc === DEFAULT_VALUE) {
    set(symbol);

    return symbol;
  }

  if (acc === ZERO) {
    if (symbol === ZERO) {
      return acc;
    }

    return symbol;
  }

  if (acc === NAN_DISPLAY) {
    return symbol;
  }

  if (acc.length >= SYMBOLS_LIMIT) {
    return acc;
  }

  if (symbol === SEPARATOR && acc.indexOf(SEPARATOR) > -1) {
    return acc;
  }

  set(acc + symbol);

  return acc + symbol;
};

const defaults = (operand) => {
  switch (operand) {
    case DEFAULT_VALUE: {
      return ZERO;
    }
    case NAN_DISPLAY: {
      return ZERO;
    }
    default: {
      return operand;
    }
  }
};

export const useCalculatorHookFactory = (_useState, _calculate) =>
  function useCalculatorHook() {
    const [operation, setOperation] = _useState(undefined);
    const [leftOperand, setLeftOperand] = _useState(DEFAULT_VALUE);
    const [rightOperand, setRightOperand] = _useState(DEFAULT_VALUE);
    const [result, setResult] = _useState(ZERO);
    const [error, setError] = _useState();

    const handleCalculationError = (e) => {
      setError(e.message);

      setTimeout(() => setError(), 3000);

      return { result: NAN_DISPLAY };
    };

    const onInput = (e) => {
      const symbol = e.target.value;

      if (
        result === NAN_DISPLAY &&
        !operation &&
        leftOperand === DEFAULT_VALUE
      ) {
        setLeftOperand(symbol);
        setResult(symbol);

        return;
      }

      if (operation) {
        return setResult(setOperand(rightOperand, symbol, setRightOperand));
      }

      return setResult(setOperand(leftOperand, symbol, setLeftOperand));
    };

    const onOperation = async (e) => {
      const next = e.target.value;

      if (
        result !== ZERO &&
        result !== NAN_DISPLAY &&
        leftOperand === DEFAULT_VALUE
      ) {
        setLeftOperand(result);
      }

      if (operation) {
        const { result: r } = await _calculate(
          operation,
          defaults(leftOperand),
          defaults(rightOperand)
        ).catch(handleCalculationError);

        if (r === NAN_DISPLAY) {
          onReset();
          setResult(NAN_DISPLAY);
        } else {
          setLeftOperand(r);
          setResult(r);
          setRightOperand(DEFAULT_VALUE);
        }
      }

      setOperation(next);
    };

    const onCalculate = async (e) => {
      if (!operation) {
        return;
      }

      const { result: r } = await _calculate(
        operation,
        defaults(leftOperand),
        defaults(rightOperand)
      ).catch(handleCalculationError);

      if (r === NAN_DISPLAY) {
        onReset();
        setResult(NAN_DISPLAY);

        return;
      }

      setLeftOperand(r);
      setResult(r);
    };

    const onReset = () => {
      setLeftOperand(DEFAULT_VALUE);
      setResult(ZERO);
      setRightOperand(DEFAULT_VALUE);
      setOperation(undefined);
    };

    return {
      onInput,
      onOperation,
      onCalculate,
      onReset,
      result,
      error,
    };
  };
