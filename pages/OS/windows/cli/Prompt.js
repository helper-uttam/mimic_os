import React from "react";

const Prompt = ({ path }) => {
  let pathStr = '';
  if (Array.isArray(path)) {
    pathStr = path.join('\\');
  } else if (typeof path === 'string') {
    pathStr = path;
  }
  return (
    <span style={{ color: "lime", fontFamily: "monospace" }}>
      {pathStr} &gt;{" "}
    </span>
  );
};

export default Prompt;
