import "./Keyboard.css";

function Keyboard(props) {
  return (
    <div className="keyboard">
      <button className="key number" onClick={props.handleNumberClick}>
        7
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        8
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        9
      </button>
      <button className="key delete" onClick={props.handleDeleteClick}>
        Del
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        4
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        5
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        6
      </button>
      <button className="key plus" onClick={props.handlePlusClick}>
        &#43;
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        1
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        2
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        3
      </button>
      <button className="key minus" onClick={props.handleMinusClick}>
        &#8722;
      </button>
      <button className="key dot" onClick={props.handleDotClick}>
        &#8901;
      </button>
      <button className="key number" onClick={props.handleNumberClick}>
        0
      </button>
      <button className="key division" onClick={props.handleDivideClick}>
        &#247;
      </button>
      <button
        className="key multiplication"
        onClick={props.handleMultiplyClick}
      >
        &#215;
      </button>
      <button className="key reset" onClick={props.handleResetClick}>
        Reset
      </button>
      <button className="key equal" onClick={props.handleEqualClick}>
        &#61;
      </button>
    </div>
  );
}

export default Keyboard;
