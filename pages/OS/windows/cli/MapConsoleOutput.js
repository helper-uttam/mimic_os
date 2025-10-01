import React from "react";
import Prompt from "./Prompt";
import classes from "./index.module.css";

const MapConsoleOutput = ({ consoleOutput, path, inputRef, onEnter }) => {
  const scrollRef = React.useRef();

  const safeConsoleOutput = Array.isArray(consoleOutput) ? consoleOutput : [];

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [safeConsoleOutput]);

  return (
    <div className={classes.command_area} ref={scrollRef} style={{ overflowY: "auto", maxHeight: "400px" }}>
      {safeConsoleOutput.length === 0 && <div>No commands yet.</div>}

      {safeConsoleOutput.map((item, index) => (
        <div className="item" key={index}>
          <Prompt path={path} />
          {item.cmd}
          {item.output &&
            typeof item.output !== "string" &&
            Object.values(item.output).map((e, id) => <div key={id}>{e}</div>)}
          {item.output && typeof item.output === "string" && <div>{item.output}</div>}
          <br />
        </div>
      ))}

      <div className={classes.inputPrompt} style={{ display: "flex", alignItems: "center" }}>
        <Prompt path={path} />
        <input
          id="cmd"
          style={{ caretColor: "white", backgroundColor: "black", color: "white", border: "none", flex: 1 }}
          type="text"
          ref={inputRef}
          onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default MapConsoleOutput;
