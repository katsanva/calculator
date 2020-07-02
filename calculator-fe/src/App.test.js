import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders trademark", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/CASIO/i);
  expect(linkElement).toBeInTheDocument();
});
