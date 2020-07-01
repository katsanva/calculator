import { DIVISION, MULTIPLICATION, MINUS, PLUS } from "./constants";

const OperationsMap = {
  [DIVISION]: "divide",
  [MULTIPLICATION]: "multiply",
  [MINUS]: "diff",
  [PLUS]: "sum",
};

export const calculate = (operation, left, right) =>
  fetch(`${process.env.REACT_APP_API_URL}/calculate`, {
    method: "POST",
    body: JSON.stringify({ operation: OperationsMap[operation], left, right }),
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.json());
    }

    return res.json();
  });
