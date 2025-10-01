import React from "react";
import Prompt from "./Prompt";

const MapConsoleOutput = ({ consoleOutput, path }) => {
  const scrollRef = React.useRef();

  const safeConsoleOutput = Array.isArray(consoleOutput) ? consoleOutput : [];

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [safeConsoleOutput]);

  return (
    <div className={safeConsoleOutput} ref={scrollRef}>
      {safeConsoleOutput.length === 0 && <div>No commands yet.</div>}
      {safeConsoleOutput.map((item, index) => (
        <div className="item" key={index}>
          <Prompt path={path} />
          {item.cmd}
          {item.output && typeof item.output !== "string" &&
            Object.values(item.output).map((e, id) => {
              return <div key={id}>{e}</div>;
            })}
          {item.output && typeof item.output === "string" && (
            <div>{item.output}</div>
          )}
          <br />
        </div>
      ))}
    </div>
  );
};

export default MapConsoleOutput;
