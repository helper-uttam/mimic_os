import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard/index";
import Signin from "./signin/index";

export default function Home() {
  const [authenticated, setAuth] = useState(false);
  useEffect(()=> {
    if(localStorage.getItem("session")){
      setAuth(true);
    }
  }, [authenticated]);
  return (
    <div>
      {!authenticated && <Signin />}
      {authenticated && <Dashboard />}
    </div>
  )
}
