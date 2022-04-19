import React from "react";
import Link from "next/link";

import Windows from "..";
import Prompt from "./Prompt";
import UseOnEnter from "./UseOnEnter";
import MapConsoleOutput from "./MapConsoleOutput";

import classes from './index.module.css';

const CLI = () => {
    const inputText = React.useRef();

  const [consoleOutput, onEnter] = UseOnEnter();

  React.useEffect(() => {
    inputText.current.value = "";
    inputText.current.focus();
  });

  return (
      <div>
          <Windows />
          <section className={classes.console} onClick={()=>{
            document.getElementById('cmd').focus();
          }}>
              <div className={classes.title}>
                <div className={classes.logo}>
                  <img src="/assets/cmd.webp" alt="cmdLogo"/>
                </div>
                <div>
                  <p className={classes.p}>Command Prompt</p>
                </div>
                <div className={classes.right_btn}>
                    <button className={classes.min}>🗕</button>
                    <button className={classes.max}>🗖</button>
                    <Link href="/windows"><button className={classes.close}>X</button></Link>
                </div>
              </div>
              <div className={classes.command_area}>
                    <MapConsoleOutput consoleOutput={consoleOutput} />
                    <div className={classes.inputPrompt}>
                        <Prompt/>
                        <input id="cmd" style={{caretColor: 'white', backgroundColor:'black', color:'white',border: 'none'}}
                        type="text"
                        ref={inputText}
                        onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
                        />
                    </div>
              </div>
            </section>
      </div> 
  );
}
export default CLI;