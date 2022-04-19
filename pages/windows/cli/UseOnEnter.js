import React from "react";

const UseOnEnter = () => {
  const commands = {
    help: ["dir: for listing all the files and folders ", 
    "cd: for changing directory ", 
    "touch: for creating files ", 
    "mkdir: for creating directories"],
    dir:[".gitignore" ,".dockerignore", "documents", "dsktop", "program.cpp","virus.bat"]
}
  const [consoleOutput, updateConsoleOutput] = React.useState([]);
  const onEnter = (value, key) => {
    if (key === "Enter") {
      console.log();
      const newConsoleLine = {
        output: commands[value] || [` "${value}" is an Invalid Command, try using "help"`],
        cmd: value
      }
      return updateConsoleOutput(consoleOutput =>
        consoleOutput.concat(newConsoleLine)
      );
    }
  };

  return [consoleOutput, onEnter];
};

export default UseOnEnter;