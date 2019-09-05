import React, { useState, Fragment } from "react";

const BASES = {
  Binary: 2,
  Octal: 8,
  Decimal: 10,
  Duodecimal: 12,
  Hexadecimal: 16
};
const DIGITS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F"
];

export default function Calculator() {
  const [bases, setBases] = useState(BASES);
  const [radix, setRadix] = useState(10);
  const [prevOperand, setPrevOperand] = useState("0");
  const [nextOperand, setNextOperand] = useState("0");
  const [operator, setOperator] = useState(null);
  const [readyForNext, setReadyForNext] = useState(true);

  function onClickDigit(event) {
    if (readyForNext) {
      setNextOperand(event.target.value);
    } else {
      setNextOperand(
        parseFloat(nextOperand + event.target.value, radix).toString()
      );
    }
  }

  function onClickSign() {
    setNextOperand(parseFloat(nextOperand * -1, radix).toString());
  }

  function onClickPoint() {
    if (readyForNext) {
      setNextOperand("0.");
    } else {
      !nextOperand.includes(".") && setNextOperand(nextOperand + ".");
    }
  }

  function onClickOperator(event) {
    // if (!operator) {
    readyForNext && setPrevOperand(nextOperand);
    setOperator(event.target.value);
    setNextOperand("0");
    // }
  }

  function onClickEquals() {
    // if (operator) {
    switch (operator) {
      case "+":
        setPrevOperand(parseFloat(prevOperand) + parseFloat(nextOperand));
        break;
      case "-":
        setPrevOperand(parseFloat(prevOperand) - parseFloat(nextOperand));
        break;
      case "*":
        setPrevOperand(parseFloat(prevOperand) * parseFloat(nextOperand));
        break;
      case "/":
        setPrevOperand(parseFloat(prevOperand) / parseFloat(nextOperand));
        break;
      default:
        break;
    }
    setReadyForNext(true);
    // }
  }

  function onChangeRadix({ target: { value } }) {
    value = parseInt(value) || "";

    if (Object.values(BASES).includes(value)) {
      setBases(BASES);
    } else {
      setBases({ ...BASES, Other: value });
    }
    setRadix(value);
    // convert operands to new radix
  }

  return (
    <Fragment>
      <div>
        <label htmlFor="radix-select">Choose a number system:</label>
        <select value={radix} onChange={onChangeRadix}>
          {Object.keys(bases).map(base => (
            <option key={base} value={bases[base]}>
              {base}
            </option>
          ))}
        </select>
        <span>Base-</span>
        <input type="text" value={radix} onChange={onChangeRadix} size="2" />
      </div>
      {radix > 1 && radix < 17 ? (
        <Fragment>
          <div>{`prevOperand: ${prevOperand} | operator: ${operator} | nextOperand: ${nextOperand}`}</div>
          {DIGITS.slice(0, radix).map(digit => (
            <button
              key={digit}
              type="button"
              value={digit}
              onClick={onClickDigit}
            >
              {digit}
            </button>
          ))}
          <br />
        </Fragment>
      ) : (
        <div style={{ color: "red" }}>Supports binary to hexadecimal only!</div>
      )}

      <button type="button" onClick={onClickOperator} value="+">
        +
      </button>
      <button type="button" onClick={onClickOperator} value="-">
        -
      </button>
      <button type="button" onClick={onClickOperator} value="*">
        *
      </button>
      <button type="button" onClick={onClickOperator} value="/">
        /
      </button>
      <button type="button" onClick={onClickEquals} value="=">
        =
      </button>
      <button type="button" onClick={onClickPoint}>
        .
      </button>
      <button type="button" onClick={onClickSign}>
        (-)
      </button>
      <button type="button">ce/ca</button>
    </Fragment>
  );
}
