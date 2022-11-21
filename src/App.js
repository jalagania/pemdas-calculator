import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import Attribution from "./components/Attribution";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [equalWasPressed, setEqualWasPressed] = useState(false);
  const [inputIsLong, setInputIsLong] = useState(false);

  // ---------- Functions ----------

  // Calculates String (PEMDAS)
  function calcStr(str) {
    if (str === "" || str === ".") {
      return "";
    }

    let newStr = str;
    if (isNaN(str.slice(-1))) {
      newStr = str.slice(0, str.length - 1);
    }

    if (isNaN(newStr.slice(-1))) {
      newStr = newStr.slice(0, str.length - 1);
    }

    const numbers = newStr.split(/\+|\-|\×|\÷/);
    const symbols = newStr.split(/\d|\./).filter((sign) => sign !== "");
    let operation = numbers.map((num) => Number(num));
    for (let i = 0; i < symbols.length; i++) {
      operation.splice([i + i + 1], 0, symbols[i]);
    }

    const x = operation.length;
    const filler = ["", ""];
    for (let i = 0; i < x; i++) {
      if (operation[i] === "×") {
        operation[i - 1] = operation[i - 1] * operation[i + 1];
        operation.splice([i], 2);
        operation.unshift(...filler);
      }
      if (operation[i] === "÷") {
        operation[i - 1] = operation[i - 1] / operation[i + 1];
        operation.splice([i], 2);
        operation.unshift(...filler);
      }
    }

    operation = operation.filter((item) => item !== "");
    let result = operation[0];
    operation.shift();

    const z = operation.length;
    for (let i = 0; i < z; i++) {
      if (operation[0] === "+") {
        result += operation[1];
        operation.splice(0, 2);
      }
      if (operation[0] === "-") {
        result -= operation[1];
        operation.splice(0, 2);
      }
    }

    return result.toString();
  }

  // Checks If String Ends With Number
  function endsWithNumber(str) {
    return str !== "" && !isNaN(str[str.length - 1]);
  }

  // Checks If String Ends With Math Sign
  function endsWithSign(str) {
    return str !== "" && !str.endsWith(".") && isNaN(str[str.length - 1]);
  }

  // Reduces Font Size When Input Gets Too Long
  function reduceFontSize() {
    if (document.querySelector(".input").offsetWidth > 350) {
      setInputIsLong(true);
    }
    if (input === "") {
      setInputIsLong(false);
    }
  }

  // Sets Rules For Math Signs
  function setSignRule(sign) {
    if (endsWithNumber(input)) {
      setInput((prevState) => prevState + sign);
    }
    if (endsWithSign(input)) {
      setInput((prevState) => prevState.slice(0, -1) + sign);
    }
  }

  // Prevents Typing More Than One Dot
  function dotIsAllowed(str) {
    if (str.search(/\+|\-|\×|\÷/) !== -1) {
      const myArray = str.split(/\+|\-|\×|\÷/);
      if (myArray[myArray.length - 1].includes(".")) {
        return false;
      }
    } else if (str.includes(".")) {
      return false;
    }
    return true;
  }

  // Prevents Typing Number After Zero
  function numberIsAllowed(str) {
    let myString = str;
    if (str.search(/\+|\-|\×|\÷/) !== -1) {
      const myArray = str.split(/\+|\-|\×|\÷/);
      myString = myArray[myArray.length - 1];
      if (myString.startsWith("0") && myString[1] !== ".") {
        return false;
      }
    } else if (myString.startsWith("0") && myString[1] !== ".") {
      return false;
    }
    return true;
  }

  // ---------- Event Handlers ----------

  useEffect(() => {
    if (!equalWasPressed) {
      setOutput(calcStr(input));
    }
    reduceFontSize();
  }, [input, equalWasPressed]);

  function handleNumberClick(event) {
    if (equalWasPressed) {
      setInput(event.target.textContent);
      setEqualWasPressed(false);
    } else if (numberIsAllowed(input)) {
      setInput((prevState) => prevState + event.target.textContent);
    }
  }

  function handleDotClick() {
    if (equalWasPressed) {
      setInput(".");
      setEqualWasPressed(false);
    } else if (dotIsAllowed(input)) {
      setInput((prevState) => prevState + ".");
    }
  }

  function handlePlusClick() {
    if (!equalWasPressed) {
      setSignRule("+");
    }
  }

  function handleMinusClick() {
    if (!equalWasPressed) {
      setSignRule("-");
    }
  }

  function handleMultiplyClick() {
    if (!equalWasPressed) {
      setSignRule("×");
    }
  }

  function handleDivideClick() {
    if (!equalWasPressed) {
      setSignRule("÷");
    }
  }

  function handleEqualClick() {
    if (
      !equalWasPressed &&
      input.match(/\+|\-|\×|\÷/) &&
      endsWithNumber(input)
    ) {
      setInput(output);
      setOutput("");
      setEqualWasPressed(true);
      setInputIsLong(false);
    }
  }

  function handleDeleteClick() {
    if (equalWasPressed) {
      setInput("");
    } else {
      setInput((prevState) => prevState.slice(0, input.length - 1));
    }
  }

  function handleResetClick() {
    setInput("");
  }

  return (
    <div className="container">
      <main className="calculator">
        <Header />
        <Display input={input} output={output} inputIsLong={inputIsLong} />
        <Keyboard
          handleNumberClick={handleNumberClick}
          handleDotClick={handleDotClick}
          handlePlusClick={handlePlusClick}
          handleMinusClick={handleMinusClick}
          handleDivideClick={handleDivideClick}
          handleMultiplyClick={handleMultiplyClick}
          handleEqualClick={handleEqualClick}
          handleDeleteClick={handleDeleteClick}
          handleResetClick={handleResetClick}
        />
      </main>
      <Attribution />
    </div>
  );
}

export default App;
