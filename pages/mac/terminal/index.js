import React, {useRef, useEffect} from "react";
import Link from "next/link";

import Linux from "..";
import Prompt from "./Prompt";
import UseOnEnter from "./UseOnEnter";
import MapConsoleOutput from "./MapConsoleOutput";

import classes from "./index.module.css";


const Terminal = () => {
    const inputText = useRef();
    const [consoleOutput, onEnter] = UseOnEnter();

  useEffect(() => {
    inputText.current.value = "";
    inputText.current.focus();
  });

    return <div>
        <Linux />
        <section className={classes.console} onClick={()=>{
            document.getElementById("cmd").focus();
          }}>
              <div className={classes.title}>
                <div className={classes.btns}>
                    <Link href="/mac"><button className={classes.close}>X</button></Link>
                    <button className={classes.min}>🗕</button>
                    <button className={classes.max}>🗖</button>
                </div>
                <div>
                  <p className={classes.p}>admin -- - bash -- 80x24</p>
                </div>
              </div>
              <div className={classes.command_area}>
              <p className={classes.green}>Thanks for using our simulator 💙, 
              You may come across some commands that<span className={classes.red}> are not working.</span> 
              In such cases please raise an issue to our GitHub respository.</p>
              <p style={{color:"yellow"}}>To get the list of all supported commands, use <span className={classes.green}>help</span> command</p>
                    <MapConsoleOutput consoleOutput={consoleOutput} /> 
                    <div className={classes.inputPrompt}>
                        <Prompt/>
                        <input id="cmd" style={{caretColor: "white", backgroundColor:"black", color:"white",border: "none"}}
                        type="text"
                        ref={inputText}
                        onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
                        /> 
                    </div>
              </div>
            </section>
    </div>
}
export default Terminal;