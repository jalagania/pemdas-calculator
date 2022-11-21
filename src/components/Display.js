import "./Display.css";

function Display(props) {
  return (
    <div className="display">
      <p className="output">{props.output}</p>
      <p className={`input-field ${props.inputIsLong ? "smaller-font" : ""}`}>
        <span className="input">{props.input}</span>
      </p>
    </div>
  );
}

export default Display;
