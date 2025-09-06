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

  if (!Array.isArray(consoleOutput)) {
    return <div className={classes.command_area}>No output available</div>;
  }

  return (
    <div className={classes.command_area} ref={scrollRef}>
      {consoleOutput.length === 0 && <div>No commands yet.</div>}

      {consoleOutput.map((item, index) => (
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
