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
  DEFAULT_DISPLAY,
  DEFAULT_VALUE,
  SEPARATOR,
  RESULT,
} from "./constants";

const setOperand = (acc, symbol, set) => {
  if (acc === DEFAULT_VALUE) {
    set(symbol);

    return symbol;
  }

  if (symbol === SEPARATOR && acc.indexOf(SEPARATOR) > -1) {
    return acc;
  }

  set(acc + symbol);

  return acc + symbol;
};

function App() {
  const [operation, setOperation] = useState(undefined);
  const [left, setLeft] = useState(DEFAULT_VALUE);
  const [right, setRight] = useState(DEFAULT_VALUE);
  const [result, setResult] = useState(DEFAULT_DISPLAY);

  const onInput = (e) => {
    if (operation) {
      return setResult(setOperand(right, e.target.value, setRight));
    }

    return setResult(setOperand(left, e.target.value, setLeft));
  };

  const onOperation = async (e) => {
    const next = e.target.value;
    if (operation) {
      const { result } = await calculate(operation, left, right);

      setLeft(result);
      setResult(result);
      setRight(DEFAULT_VALUE);
    }

    setOperation(next);
  };

  const onCalculate = async (e) => {
    if (!operation) {
      return;
    }

    const { result } = await calculate(operation, left, right);

    setLeft(result);
    setResult(result);
    setRight(DEFAULT_VALUE);
    setOperation(undefined);
  };

  const onReset = () => {
    setLeft(DEFAULT_VALUE);
    setResult(DEFAULT_DISPLAY);
    setRight(DEFAULT_VALUE);
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
            value={"0"}
          >
            0
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
