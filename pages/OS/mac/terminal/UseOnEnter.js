import React, { useState } from "react";

const initialFileSystem = {
  name: "/",
  type: "folder",
  children: {
    "bfs.txt": { type: "file", content: "Breadth First Search notes" },
    "config.js": { type: "file", content: "export default config;" },
    documents: { type: "folder", children: {} },
    desktop: { type: "folder", children: {} },
    programs: { type: "folder", children: {} },
    temp: { type: "folder", children: {} },
  },
};

const UseOnEnter = () => {
  const [consoleOutput, updateConsoleOutput] = useState([]);
  const [fs, setFs] = useState(initialFileSystem);
  const [path, setPath] = useState([]); // e.g., ['documents']
  const [history, setHistory] = useState([]);

  const getCurrentDir = (currentPath = path) => {
    let current = fs;
    for (const part of currentPath) {
      if (!current.children || !current.children[part]) {
        return fs; // fallback to root if invalid path
      }
      current = current.children[part];
    }
    return current;
  };

  const formatPath = () => {
    return "/Users/uttam" + (path.length ? "/" + path.join("/") : "");
  };

  const commandHandlers = {
    pwd: () => [formatPath()],

    ls: () => {
      const current = getCurrentDir();
      if (!current.children) return ["No files or folders"];
      return [Object.keys(current.children).join("  | ") || " "];
    },

    clear: () => {
      updateConsoleOutput([]);
      return [];
    },

    cd: (_, args) => {
      const target = args[0];
      if (!target) return ["Missing folder name"];
      const current = getCurrentDir();

      if (!current.children) return [`Current directory has no children`];

      if (target === "..") {
        if (path.length === 0) return ["Already at root"];
        setPath((prev) => prev.slice(0, -1));
        return ["Moved up one directory"];
      }

      const next = current.children[target];
      if (!next || next.type !== "folder") {
        return [`cd: no such directory: ${target}`];
      }

      setPath((prev) => [...prev, target]);
      return [`Navigated to '${target}'`];
    },

    mkdir: (_, args) => {
      const name = args[0];
      if (!name) return ["Please provide a directory name"];
      const current = getCurrentDir();
      if (!current.children) current.children = {};
      if (current.children[name]) return ["Directory already exists"];
      current.children[name] = { type: "folder", children: {} };
      setFs({ ...fs });
      return [`Directory '${name}' created`];
    },

    rmdir: (_, args) => {
      const name = args[0];
      const current = getCurrentDir();
      if (!current.children || !current.children[name]) return ["Directory not found"];
      if (current.children[name].type !== "folder") return ["Not a directory"];
      delete current.children[name];
      setFs({ ...fs });
      return [`Directory '${name}' deleted`];
    },

    touch: (_, args) => {
      const name = args[0];
      if (!name) return ["Please provide a file name"];
      const current = getCurrentDir();
      if (!current.children) current.children = {};
      current.children[name] = { type: "file", content: "" };
      setFs({ ...fs });
      return [`File '${name}' created`];
    },

    cat: (_, args) => {
      const name = args[0];
      const current = getCurrentDir();
      if (!current.children || !current.children[name]) return [`File not found: ${name}`];
      const file = current.children[name];
      if (file.type !== "file") return [`${name} is not a file`];
      return [file.content || ""];
    },

    echo: (_, args) => [args.join(" ")],

    mv: (_, args) => {
      const [oldName, newName] = args;
      const current = getCurrentDir();
      if (!current.children || !current.children[oldName]) return [`Cannot find '${oldName}'`];
      current.children[newName] = current.children[oldName];
      delete current.children[oldName];
      setFs({ ...fs });
      return [`Renamed '${oldName}' to '${newName}'`];
    },

    history: () => history.map((cmd, i) => `${i + 1}: ${cmd}`),

    whoami: () => ["uttam"],

    date: () => [new Date().toString()],

    help: () => [
      "Available commands:",
      "ls        - list files and folders",
      "cd <dir>  - change directory",
      "cd ..     - go up one directory",
      "mkdir <dir> - create folder",
      "rmdir <dir> - delete folder",
      "touch <file> - create file",
      "cat <file> - view file content",
      "echo <text> - print text",
      "mv <old> <new> - rename file/folder",
      "clear     - clear terminal",
      "pwd       - print working directory",
      "whoami    - show current user",
      "date      - show current date/time",
      "history   - show past commands",
    ],
  };

  const onEnter = (inputValue, key) => {
    if (key === "Enter") {
      const value = inputValue?.trim();
      if (!value) return;

      const [command, ...args] = value.split(" ");
      setHistory((prev) => [...prev, value]);

      const handler = commandHandlers[command];
      const output = handler ? handler(command, args) : [`Command not found: ${command}`];

      const newConsoleLine = { cmd: value, output };
      updateConsoleOutput((prev) => [...prev, newConsoleLine]);
    }
  };

  return [consoleOutput, onEnter, formatPath];
};

export default UseOnEnter;
