import { renderHook, act } from "@testing-library/react-hooks";
import { useCalculatorHookFactory } from "./use-calculator-hook.factory";
import { useState } from "react";
import { ZERO, SEPARATOR, PLUS, DIVISION, MINUS } from "./constants";

test("should set default result", () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {})()
  );

  expect(result.current.result).toBe(ZERO);
});

test("should set default error", () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {})()
  );

  expect(result.current.error).toBe(undefined);
});

test("should set result on first input", () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {})()
  );

  act(() => {
    result.current.onInput({ target: { value: "1" } });
  });

  expect(result.current.result).toBe("1");
});

test("should concatenate result of input", async () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {})()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "2" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "3" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: SEPARATOR } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "5" } });
  });

  expect(result.current.result).toBe("123.5");
});

test("should ignore repeating separators", async () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {})()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "2" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "3" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: SEPARATOR } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "5" } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: SEPARATOR } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "7" } });
  });

  expect(result.current.result).toBe("123.57");
});

test("should call api on second operation", async () => {
  const api = jest.fn().mockReturnValue(
    Promise.resolve({
      result: "result",
    })
  );
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onInput({ target: { value: "2" } });
  });
  expect(result.current.result).toBe("2");
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });

  expect(result.current.result).toBe("result");

  expect(api).toHaveBeenCalledWith(PLUS, "1", "2");
});

test("should handle error from api", async () => {
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, async () => {
      throw new Error("some error");
    })()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });
  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });

  expect(result.current.error).toBe("some error");
});

test("should call api on calculation call", async () => {
  const api = jest.fn().mockReturnValue(
    Promise.resolve({
      result: "result",
    })
  );
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onInput({ target: { value: "2" } });
  });
  expect(result.current.result).toBe("2");
  await act(async () => {
    return result.current.onCalculate();
  });

  expect(result.current.result).toBe("result");

  expect(api).toHaveBeenCalledWith(PLUS, "1", "2");
});

test("should call api on sign change", async () => {
  const api = jest.fn().mockReturnValue(
    Promise.resolve({
      result: "result",
    })
  );
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onOperation({ target: { value: MINUS } });
  });
  expect(result.current.result).toBe(ZERO);
  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });
  expect(result.current.result).toBe("result");
  expect(api).toHaveBeenCalledWith(MINUS, "0", "1");
});

test("should calculate sign change", async () => {
  const api = jest.fn().mockReturnValue(
    Promise.resolve({
      result: "result",
    })
  );
  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onOperation({ target: { value: MINUS } });
  });
  expect(result.current.result).toBe(ZERO);
  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onCalculate();
  });
  expect(result.current.result).toBe("result");
  expect(api).toHaveBeenCalledWith(MINUS, "0", "1");
});

test("should reset NaN, input next", async () => {
  const api = jest.fn().mockReturnValue(
    Promise.resolve({
      result: "NaN",
    })
  );

  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "0" } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onOperation({ target: { value: DIVISION } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onInput({ target: { value: "0" } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onCalculate();
  });
  expect(api).toHaveBeenCalledWith(DIVISION, "0", "0");

  expect(result.current.result).toBe("NaN");
  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onOperation({ target: { value: MINUS } });
  });
  expect(result.current.result).toBe("1");
});

test("should treat reset NaN, operation next", async () => {
  const api = jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        result: "NaN",
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        result: "1",
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        result: "1",
      })
    );

  const { result } = renderHook(() =>
    useCalculatorHookFactory(useState, api)()
  );

  await act(async () => {
    return result.current.onInput({ target: { value: "0" } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onOperation({ target: { value: DIVISION } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onInput({ target: { value: "0" } });
  });
  expect(result.current.result).toBe("0");
  await act(async () => {
    return result.current.onCalculate();
  });

  expect(result.current.result).toBe("NaN");
  await act(async () => {
    return result.current.onOperation({ target: { value: PLUS } });
  });
  expect(result.current.result).toBe("NaN");
  await act(async () => {
    return result.current.onInput({ target: { value: "1" } });
  });
  expect(result.current.result).toBe("1");
  await act(async () => {
    return result.current.onCalculate();
  });
  expect(result.current.result).toBe("1");
});
