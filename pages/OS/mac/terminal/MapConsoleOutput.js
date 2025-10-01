import React from "react";
import Prompt from "./Prompt";
import classes from "./index.module.css";

const MapConsoleOutput = ({ consoleOutput, path }) => {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const safeConsoleOutput = Array.isArray(consoleOutput) ? consoleOutput : [];

  return (
    <div className={classes.command_area} ref={scrollRef}>
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
    </div>
  );
};

export default MapConsoleOutput;
