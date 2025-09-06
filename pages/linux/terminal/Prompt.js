import React from "react";

const Prompt = ({ path }) => {
  const pathStr = "/" + (path.length ? path.join("/") : "");
  return (
    <span style={{ color: "yellow" }}>
      uttam@linux-desktop:{pathStr}&#36;{" "}
    </span>
  );
};

export default Prompt;
