import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { calculate } from "./calculator.api";
import { Calculator } from "./Calculator";
import { useCalculatorHookFactory } from "./use-calculator-hook.factory";

const useCalculatorHook = useCalculatorHookFactory(useState, calculate);

function App() {
  const {
    onInput,
    onOperation,
    onCalculate,
    onReset,
    result,
    error,
  } = useCalculatorHook();

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
