import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import {
  DIVISION,
  MULTIPLICATION,
  MINUS,
  PLUS,
  ZERO,
  SEPARATOR,
  RESULT,
} from "./constants";

export const Calculator = ({
  onInput,
  onOperation,
  onCalculate,
  onReset,
  result,
  error,
}) => (
  <Container className="mx-auto" style={{ width: "500px" }}>
    <Badge>CASIO</Badge>
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
        <Button variant="outline-secondary" onClick={onInput} block value={"1"}>
          1
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"2"}>
          2
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"3"}>
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
        <Button variant="outline-secondary" onClick={onInput} block value={"4"}>
          4
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"5"}>
          5
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"6"}>
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
        <Button variant="outline-secondary" onClick={onInput} block value={"7"}>
          7
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"8"}>
          8
        </Button>
      </Col>
      <Col className={"mb-1"}>
        <Button variant="outline-secondary" onClick={onInput} block value={"9"}>
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
    <Row style={{ display: error ? "block" : "none" }}>
      <Col>
        <Alert variant={"danger"}>{error}</Alert>
      </Col>
    </Row>
  </Container>
);
