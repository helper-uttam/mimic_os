import React from "react";

const Prompt = ({ path }) => {
  let pathStr = '';
  if (Array.isArray(path)) {
    pathStr = '/' + path.join('/');
  } else if (typeof path === 'string') {
    pathStr = path;
  }
  return (
    <span style={{ color: "yellow", fontFamily: "monospace" }}>
      Mac-Uttam:{pathStr} $
    </span>
  );
};

export default Prompt;
