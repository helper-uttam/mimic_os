import React from "react";
import Prompt from "./Prompt";

const MapConsoleOutput = ({ consoleOutput }) => {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  // console.log(consoleOutput.output);
  return (
    <div className={consoleOutput} ref={scrollRef}>
      {consoleOutput.map((item, index) => (
        <div className="item" key={index}>
          <Prompt />
            {item.cmd}
          <div>{item.output}</div>
        </div>
      ))}
    </div>
  );
};

export default MapConsoleOutput;