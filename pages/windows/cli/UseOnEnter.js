import React, {useState} from "react";

const UseOnEnter = () => {
  var [dir, setDir] = useState(".gitignore  | .dockerignore  |  documents   |   desktop  |   program.cpp   |  virus.bat  | ")
  var newDir = '';
  const commands = {
    dir,
    mkdir: `Directory created successfuly, run "dir" to see all directories.`,
    rmdir: `Directory deleted successfuly, run "dir" to see all directories.`,
    help :  ["dir: for listing all the files and folders ", 
    "cd: for changing directory ", 
    "touch: for creating files ", 
    "mkdir: for creating directories"],
    cls: 'Console cleared'
  }
 
  const clear = () => {
      const items = document.getElementsByClassName('item');
      Object.values(items).forEach(element => {
        element.innerHTML = "";
      });
  } 

  const [consoleOutput, updateConsoleOutput] = React.useState([]);
  const onEnter = (value, key) => {
    if (key === "Enter") {
      const newConsoleLine = {
        output: commands[value] || [` "${value}" is an Invalid Command, try using "help"`],
        cmd: value
      }
      if(value.includes("mkdir ")){
          newDir = `  ${value.replace("mkdir", '')}`
          setDir(dir+newDir+'  | ');
          newConsoleLine.output = commands['mkdir'] || [` "${value}" is an Invalid Command, try using "help"`];
      }
      if(value.includes("rmdir ")){
        let folder_to_deleted = value.replace('rmdir', '');
        console.log(dir.replace(folder_to_deleted, ''));
        setDir(dir.replace(folder_to_deleted+'  | ', ''));
        newConsoleLine.output = commands['rmdir'] || [` "${value}" is an Invalid Command, try using "help"`];
      }
      if(value.includes("cls")){
        clear();
        newConsoleLine.output = commands['cls'] || [` "${value}" is an Invalid Command, try using "help"`];
      }
      return updateConsoleOutput(consoleOutput =>
        consoleOutput.concat(newConsoleLine)
      );
    }
  };

  return [consoleOutput, onEnter];
};

export default UseOnEnter;