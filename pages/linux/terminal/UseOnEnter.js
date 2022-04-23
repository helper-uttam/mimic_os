import React, {useState} from "react";

const UseOnEnter = () => {
  var [dir, setDir] = useState(".gitignore  | .dockerignore  |  documents   |   desktop  |   program.cpp   |  virus.bat  | ")
  var newDir = "";
  const commands = {
    dir: [dir],
    mv: [`File renamed successfully`],
    mkdir: [`Directory created successfully `, `run "dir" to see all directories.`],
    rmdir: [`Directory deleted successfully `, `run "dir" to see all directories.`],
    cls: ["Console cleared"],
    vol: [`Volume in drive C is Linux`, 
          `Volume Serial Number is 0066-DF6F`],
    cd: [`Your command: cd (to navigate betweeen directories) `, 
          `Currently this feature is not available!`],
    date: [`The current date and time is: ${new Date()}`],
    help :  [`ls: for listing all the files and folders ` , 
    `cd: for changing directory ` ,
    `touch: for creating files ` ,  
    `mkdir: for creating directories ` , 
    `vol: to check volume`]
  }
 
  const clear = () => {
      const items = document.getElementsByClassName("item");
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
          newDir = `  ${value.replace("mkdir", "")}`
          setDir(dir+newDir+"  | ");
          newConsoleLine.output = commands["mkdir"] ;
      }
      if(value.includes("rmdir ")){
        let folder_to_deleted = value.replace("rmdir", "");
        console.log(dir.replace(folder_to_deleted, ""));
        setDir(dir.replace(folder_to_deleted+"  | ", ""));
        newConsoleLine.output = commands["rmdir"] ;
      }
      if(value.includes("cls")){
        clear();
        newConsoleLine.output = commands["cls"];
      }
      if(value.includes("cd")){
        newConsoleLine.output = commands["cd"] ;
      }
      if(value.includes("mv")){
        let rep = value.toString().split(" ");
        let newDir = dir.replace(rep[1] , rep[2]);
        setDir(newDir)
        newConsoleLine.output = commands["mv"] ;
      }
      return updateConsoleOutput(consoleOutput =>
        consoleOutput.concat(newConsoleLine)
      );
    }
  };

  return [consoleOutput, onEnter];
};

export default UseOnEnter;