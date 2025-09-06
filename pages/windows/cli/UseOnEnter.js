import React, { useState } from "react";

// Simulated Windows-like filesystem
const initialFileSystem = {
  name: "C:\\",
  type: "folder",
  children: {
    "bfs.txt": { type: "file", content: "BFS notes here." },
    "config.js": { type: "file", content: "module.exports = {};" },
    "documents": { type: "folder", children: {} },
    "desktop": { type: "folder", children: {} },
    "programs": { type: "folder", children: {} },
    "temp": { type: "folder", children: {} },
  },
};

const UseOnEnter = () => {
  const [fs, setFs] = useState(initialFileSystem);
  const [path, setPath] = useState([]); // e.g., ['desktop']
  const [consoleOutput, updateConsoleOutput] = useState([]);
  const [history, setHistory] = useState([]);

  const getCurrentDir = () => {
    let current = fs;
    for (const part of path) {
      current = current.children[part];
    }
    return current;
  };

  const formatPath = () => {
    return "C:\\" + path.join("\\");
  };

  const commandHandlers = {
    help: () => [
      `Supported Commands:`,
      `dir           - list contents`,
      `cd <dir>      - change directory`,
      `cd ..         - go up one directory`,
      `mkdir <name>  - create folder`,
      `rmdir <name>  - remove folder`,
      `ren <old> <new> - rename file/folder`,
      `del <file>    - delete a file`,
      `copy <src> <dest> - copy file`,
      `type <file>   - show file contents`,
      `echo <text>   - print message`,
      `cls           - clear screen`,
      `vol           - show volume info`,
      `time          - show time`,
      `history       - command history`,
    ],

    dir: () => {
      const current = getCurrentDir();
      const list = Object.keys(current.children);
      return list.length ? list : ["No files or directories"];
    },

    cd: (_, args) => {
      const current = getCurrentDir();
      const target = args[0];
      if (!target) return ["The syntax of the command is incorrect."];

      if (target === "..") {
        if (path.length === 0) return ["Already at root"];
        setPath((prev) => prev.slice(0, -1));
        return ["Moved up one level"];
      }

      const next = current.children[target];
      if (!next || next.type !== "folder") {
        return [`The system cannot find the path specified: ${target}`];
      }

      setPath([...path, target]);
      return [`Changed directory to ${target}`];
    },

    mkdir: (_, args) => {
      const name = args[0];
      if (!name) return ["Missing folder name"];
      const current = getCurrentDir();
      if (current.children[name]) return ["Directory already exists"];
      current.children[name] = { type: "folder", children: {} };
      setFs({ ...fs });
      return [`Directory '${name}' created.`];
    },

    rmdir: (_, args) => {
      const name = args[0];
      const current = getCurrentDir();
      if (!current.children[name]) return ["Directory not found"];
      if (current.children[name].type !== "folder") return ["Not a directory"];
      delete current.children[name];
      setFs({ ...fs });
      return [`Directory '${name}' removed.`];
    },

    ren: (_, args) => {
      const [oldName, newName] = args;
      const current = getCurrentDir();
      if (!oldName || !newName) return ["Syntax: ren <oldname> <newname>"];
      if (!current.children[oldName]) return [`Cannot find ${oldName}`];
      current.children[newName] = current.children[oldName];
      delete current.children[oldName];
      setFs({ ...fs });
      return [`Renamed '${oldName}' to '${newName}'`];
    },

    del: (_, args) => {
      const name = args[0];
      const current = getCurrentDir();
      if (!current.children[name]) return [`Cannot find ${name}`];
      if (current.children[name].type !== "file") return [`'${name}' is not a file`];
      delete current.children[name];
      setFs({ ...fs });
      return [`File '${name}' deleted.`];
    },

    copy: (_, args) => {
      const [src, dest] = args;
      const current = getCurrentDir();
      if (!current.children[src]) return [`Cannot find file: ${src}`];
      current.children[dest] = { ...current.children[src] };
      setFs({ ...fs });
      return [`Copied '${src}' to '${dest}'`];
    },

    type: (_, args) => {
      const name = args[0];
      const current = getCurrentDir();
      const file = current.children[name];
      if (!file) return [`File not found: ${name}`];
      if (file.type !== "file") return [`'${name}' is not a file`];
      return [file.content || ""];
    },

    echo: (_, args) => [args.join(" ")],

    cls: () => {
      const items = document.getElementsByClassName("item");
      Object.values(items).forEach((el) => (el.innerHTML = ""));
      return ["Cleared screen"];
    },

    vol: () => [
      `Volume in drive C is Windows`,
      `Volume Serial Number is 0066-DF6F`,
    ],

    time: () => [`The current time is: ${new Date().toLocaleTimeString()}`],

    history: () => history.map((cmd, i) => `${i + 1}: ${cmd}`),
  };

  const onEnter = (inputValue, key) => {
    if (key === "Enter") {
      const value = inputValue.trim();
      if (!value) return;

      const [command, ...args] = value.split(" ");
      setHistory((prev) => [...prev, value]);

      const handler = commandHandlers[command.toLowerCase()];
      const output = handler ? handler(command, args) : [`'${command}' is not recognized as an internal or external command`];

      const newConsoleLine = { cmd: value, output };
      updateConsoleOutput((prev) => [...prev, newConsoleLine]);
    }
  };

  return [consoleOutput, onEnter];
};

export default UseOnEnter;
