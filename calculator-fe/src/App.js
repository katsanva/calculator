import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
      );

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
    );

    setLeftOperand(result);
    setResult(result);
  };

  const onReset = () => {
    setLeftOperand(DEFAULT_VALUE);
    setResult(ZERO);
    setRightOperand(DEFAULT_VALUE);
    setOperation(undefined);
  };

  return (
    <Container className="mx-auto" style={{ width: "500px" }}>
      <Row>
        <Col className={"my-1"}>
          <Form.Control placeholder={result} disabled />
        </Col>
      </Row>
      <Row>
        <Col className={"mb-1"}>
          <Button variant="outline-secondary" disabled block>
            &nbsp;
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button variant="outline-secondary" disabled block>
            &nbsp;
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button variant="outline-secondary" disabled block>
            &nbsp;
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button variant="secondary" block onClick={onReset}>
            C
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"1"}
          >
            1
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"2"}
          >
            2
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"3"}
          >
            3
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="secondary"
            block
            value={DIVISION}
            onClick={onOperation}
          >
            {DIVISION}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"4"}
          >
            4
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"5"}
          >
            5
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"6"}
          >
            6
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="secondary"
            block
            value={MULTIPLICATION}
            onClick={onOperation}
          >
            {MULTIPLICATION}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"7"}
          >
            7
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"8"}
          >
            8
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={"9"}
          >
            9
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button variant="secondary" block value={MINUS} onClick={onOperation}>
            {MINUS}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={ZERO}
          >
            {ZERO}
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button
            variant="outline-secondary"
            onClick={onInput}
            block
            value={SEPARATOR}
          >
            {SEPARATOR}
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button block value={RESULT} onClick={onCalculate}>
            {RESULT}
          </Button>
        </Col>
        <Col className={"mb-1"}>
          <Button variant="secondary" block value={PLUS} onClick={onOperation}>
            {PLUS}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
