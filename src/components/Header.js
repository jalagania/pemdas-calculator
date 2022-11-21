import { useState } from "react";
import "./Header.css";

function Header() {
  const [circlePosition, setCirclePosition] = useState("");

  return (
    <header className="heading">
      <p className="calc-name">
        <span>Pemdas</span> calc
      </p>
      <div className="theme-switcher">
        <p className="theme">Theme</p>
        <div className="switcher-box">
          <div className="theme-btns">
            <button
              className="theme-btn btn-1"
              onClick={() => {
                document.body.className = "";
                setCirclePosition("");
              }}
            >
              1
            </button>
            <button
              className="theme-btn btn-2"
              onClick={() => {
                document.body.className = "white-theme";
                setCirclePosition("middle");
              }}
            >
              2
            </button>
            <button
              className="theme-btn btn-3"
              onClick={() => {
                document.body.className = "purple-theme";
                setCirclePosition("right");
              }}
            >
              3
            </button>
          </div>
          <div className="switcher-bg">
            <div className={`circle ${circlePosition}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
