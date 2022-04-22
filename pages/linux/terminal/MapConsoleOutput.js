import React from "react";
import Prompt from "./Prompt";

const MapConsoleOutput = ({ consoleOutput }) => {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  return (
    <div className={consoleOutput} ref={scrollRef}>
      {consoleOutput.map((item, index) => (
        <div className="item" key={index}>
          <Prompt />
            {item.cmd}
          {Object.values(item.output).map((e, id) => {
            return <div key={id}>{e}</div>
          })}
          <br />
        </div>
        
      ))}
    </div>
  );
};

export default MapConsoleOutput;