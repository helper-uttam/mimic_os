import React from "react";
import Link from "next/link";

import Windows from "..";
import UseOnEnter from "./UseOnEnter";
import MapConsoleOutput from "./MapConsoleOutput";

import classes from "./index.module.css";

const CLI = () => {
  const inputText = React.useRef();

  const [consoleOutput, onEnter, formatPath] = UseOnEnter();

  React.useEffect(() => {
    if (inputText.current) {
      inputText.current.value = "";
      inputText.current.focus();
    }
  }, [consoleOutput]);

  return (
    <div className={classes.mob}>
      <Windows />
      <section
        className={classes.console}
        onClick={() => {
          inputText.current?.focus();
        }}
      >
        <div className={classes.title}>
          <div className={classes.logo}>
            <p className={classes.p}>{formatPath()}</p>
          </div>
          <div className={classes.right_btn}>
            <button className={classes.min}>🗕</button>
            <button className={classes.max}>🗖</button>
            <Link href="./windows">
              <button className={classes.close}>X</button>
            </Link>
          </div>
        </div>
        <p className={classes.green}>
          Thanks for using our simulator 💙, You may come across some commands that
          <span className={classes.red}> are not working.</span> In such cases please raise an issue to our GitHub
          repository.
        </p>
        <p style={{ color: "yellow" }}>
          To get the list of all supported commands, use <span className={classes.green}>help</span> command
        </p>

        <MapConsoleOutput
          consoleOutput={consoleOutput}
          path={formatPath()}
          inputRef={inputText}
          onEnter={onEnter}
        />
      </section>
    </div>
  );
};

export default CLI;
