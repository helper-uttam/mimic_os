import React, { useRef, useEffect, useState } from "react";
import MapConsoleOutput from "./MapConsoleOutput";
import Prompt from "./Prompt";
import UseOnEnter from "./UseOnEnter";
import classes from "./index.module.css";

const Terminal = () => {
  const inputText = useRef();
  const [consoleOutput, onEnter, formatPath] = UseOnEnter();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (!isMinimized && !isClosed) {
      inputText.current.value = "";
      inputText.current.focus();
    }
  }, [consoleOutput, isMinimized, isClosed]);

  if (isClosed) {
    return (
      <div
        style={{
          padding: "20px",
          color: "white",
          fontFamily: "monospace",
          backgroundImage: "url('/assets/mac/bg.jpg')",
          height: "100vh",
        }}
      >
        <p>Terminal closed.</p>
        <button
          style={{
            backgroundColor: "#00ff00",
            color: "black",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => setIsClosed(false)}
        >
          Reopen Terminal
        </button>
      </div>
    );
  }

  const currentPath = formatPath();

  return (
    <div className={classes.body} style={{ backgroundImage: "url('/assets/mac/bg.jpg')" }}>
      <div
        className={`${classes.console} ${
          isMinimized ? classes.minimized : ""
        } ${isMaximized ? classes.maximized : ""}`}
        onClick={() => {
          if (!isMinimized) inputText.current.focus();
        }}
      >
        <div className={classes.title}>
          <div className={classes.btns}>
            <button
              className={classes.close}
              onClick={() => setIsClosed(true)}
              title="Close Terminal"
            />
            <button
              className={classes.min}
              onClick={() => setIsMinimized(!isMinimized)}
              title="Minimize Terminal"
            />
            <button
              className={classes.max}
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize Terminal"
            />
          </div>
          <div>
            <p className={classes.p}>admin -- - bash -- 80x24</p>
          </div>
        </div>
        {!isMinimized && (
          <>
            <div className={classes.command_area}>
              <p className={classes.green}>
                Thanks for using our simulator 💙, You may come across some commands that
                <span className={classes.red}> are not working.</span> In such cases please raise an issue to our GitHub repository.
              </p>
              <p style={{ color: "yellow" }}>
                To get the list of all supported commands, use <span className={classes.green}>help</span> command
              </p>
              <MapConsoleOutput consoleOutput={consoleOutput} path={currentPath} />
              <div className={classes.inputPrompt}>
                <Prompt path={currentPath} />
                <input
                  id="cmd"
                  style={{
                    caretColor: "white",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                  }}
                  type="text"
                  ref={inputText}
                  onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
                  autoComplete="off"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;
