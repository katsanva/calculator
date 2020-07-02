import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { calculate } from "./calculator.api";
import {
  DIVISION,
  MULTIPLICATION,
  MINUS,
  PLUS,
  ZERO,
  DEFAULT_VALUE,
  SEPARATOR,
  RESULT,
  SYMBOLS_LIMIT,
  NAN_DISPLAY,
} from "./constants";
import { Calculator } from "./Calculator";

const setOperand = (acc, symbol, set) => {
  if (acc === DEFAULT_VALUE) {
    set(symbol);

    return symbol;
  }

  if (acc === ZERO && symbol === ZERO) {
    return acc;
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

function App() {
  const [operation, setOperation] = useState(undefined);
  const [leftOperand, setLeftOperand] = useState(DEFAULT_VALUE);
  const [rightOperand, setRightOperand] = useState(DEFAULT_VALUE);
  const [result, setResult] = useState(ZERO);
  const [error, setError] = useState();

  const handleCalculationError = (e) => {
    setError(e.message);

    setTimeout(() => setError(), 3000);

    return { result: NAN_DISPLAY };
  };

  const onInput = (e) => {
    const symbol = e.target.value;

    if (result === NAN_DISPLAY && !operation && leftOperand === DEFAULT_VALUE) {
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
      const { result } = await calculate(
        operation,
        defaults(leftOperand),
        defaults(rightOperand)
      ).catch(handleCalculationError);

      setLeftOperand(result);
      setResult(result);
      setRightOperand(DEFAULT_VALUE);
    }

    setOperation(next);
  };

  const onCalculate = async (e) => {
    if (!operation) {
      return;
    }

    const { result } = await calculate(
      operation,
      defaults(leftOperand),
      defaults(rightOperand)
    ).catch(handleCalculationError);

    setLeftOperand(result);
    setResult(result);
  };

  const onReset = () => {
    setLeftOperand(DEFAULT_VALUE);
    setResult(ZERO);
    setRightOperand(DEFAULT_VALUE);
    setOperation(undefined);
  };

  const props = {
    onInput,
    onOperation,
    onCalculate,
    onReset,
    result,
    error,
  };

  return <Calculator {...props} />;
}

export default App;
