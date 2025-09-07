import React from "react";

const Prompt = ({ path }) => {
  const safePath = Array.isArray(path) ? path : [];
  const pathStr = "/" + (safePath.length ? safePath.join("/") : "");
  return (
    <span style={{ color: "yellow" }}>
      uttam@linux-desktop:{pathStr}&#36;{" "}
    </span>
  );
};

export default Prompt;
