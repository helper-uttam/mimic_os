import React, { useState } from "react";

const initialFileSystem = {
  name: "/",
  type: "folder",
  children: {
    "bfs.txt": { type: "file" },
    "config.js": { type: "file" },
    "documents": { type: "folder", children: {} },
    "desktop": { type: "folder", children: {} },
    "programs": { type: "folder", children: {} },
    "temp": { type: "folder", children: {} }
  }
};

const UseOnEnter = () => {
  const [consoleOutput, updateConsoleOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [fs, setFs] = useState(initialFileSystem);
  const [path, setPath] = useState([]); // example: ['desktop']

  // Helper: get current directory node
  const getCurrentDir = (fs, path) => {
    let current = fs;
    for (let part of path) {
      current = current.children[part];
    }
    return current;
  };

  // Get formatted listing of current dir
  const ls = () => {
    const current = getCurrentDir(fs, path);
    return Object.keys(current.children).join("  | ");
  };

  const commandHandlers = {
    ls: () => [ls()],

    pwd: () => ["/" + path.join("/")],

    whoami: () => ["uttam"],

    history: () => history.map((cmd, i) => `${i + 1}: ${cmd}`),

    echo: (_, args) => [args.join(" ")],

    mkdir: (_, args) => {
      const name = args[0];
      if (!name) return ["Please specify a folder name"];
      const current = getCurrentDir(fs, path);
      if (current.children[name]) return ["Folder already exists"];
      current.children[name] = { type: "folder", children: {} };
      setFs({ ...fs });
      return [`Directory '${name}' created successfully.`];
    },

    touch: (_, args) => {
      const name = args[0];
      if (!name) return ["Please specify a file name"];
      const current = getCurrentDir(fs, path);
      if (current.children[name]) return ["File already exists"];
      current.children[name] = { type: "file", content: "" };
      setFs({ ...fs });
      return [`File '${name}' created successfully.`];
    },

    cat: (_, args) => {
      const name = args[0];
      const current = getCurrentDir(fs, path);
      if (!current.children[name]) return [`File not found: ${name}`];
      if (current.children[name].type !== "file") return [`${name} is not a file.`];
      return [`[${name}] ${current.children[name].content || "Empty file."}`];
    },

    cd: (_, args) => {
      const dirName = args[0];
      const current = getCurrentDir(fs, path);

      if (!dirName) return ["Please specify a folder name"];

      if (dirName === "..") {
        if (path.length === 0) return ["Already in root"];
        setPath(path.slice(0, -1));
        return ["Moved up one directory"];
      }

      const next = current.children[dirName];
      if (!next || next.type !== "folder") return ["Directory not found"];
      setPath([...path, dirName]);
      return [`Navigated to ${dirName}`];
    },

    rmdir: (_, args) => {
      const name = args[0];
      const current = getCurrentDir(fs, path);
      if (!current.children[name]) return ["Directory not found"];
      if (current.children[name].type !== "folder") return ["Not a directory"];
      delete current.children[name];
      setFs({ ...fs });
      return [`Directory '${name}' removed.`];
    },

    mv: (_, args) => {
      const [oldName, newName] = args;
      const current = getCurrentDir(fs, path);
      if (!current.children[oldName]) return ["Item not found"];
      current.children[newName] = current.children[oldName];
      delete current.children[oldName];
      setFs({ ...fs });
      return [`Renamed '${oldName}' to '${newName}'`];
    },

    cls: () => {
      const items = document.getElementsByClassName("item");
      Object.values(items).forEach(el => el.innerHTML = "");
      return ["Console cleared"];
    },

    date: () => [`Current date and time: ${new Date().toString()}`],

    vol: () => [
      `Volume in drive C is Linux`,
      `Volume Serial Number is 0066-DF6F`
    ],

    help: () => [
      `ls, pwd, cd, mkdir, rmdir, touch, cat, mv, echo, cls, vol, date, whoami, history`
    ],
  };

  const onEnter = (inputValue, key) => {
    if (key === "Enter") {
      const value = inputValue.trim();
      if (!value) return;

      const [command, ...args] = value.split(" ");
      setHistory((prev) => [...prev, value]);

      const handler = commandHandlers[command];
      const output = handler ? handler(command, args) : [`"${value}" is an Invalid Command, try "help"`];

      const newConsoleLine = { cmd: value, output };
      updateConsoleOutput((prev) => [...prev, newConsoleLine]);
    }
  };

  return [consoleOutput, onEnter];
};

export default UseOnEnter;
