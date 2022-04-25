import axios from "axios";
import React, { useState, useEffect } from "react";

import Dashboard from "./dashboard/index";
import Signin from "./signin/index";

export default function Home() {
  const [authenticated, setAuth] = useState(false);
  
  useEffect(()=> {
    if(localStorage.getItem("session")){
      setAuth(true);
    }
    axios.post(`${process.env.BASE_URL}analytics`)
    .then(res => console.log("Success"))
      .catch(err => console.log(err))
  }, [authenticated]);
  
  return (
    <div>
      {!authenticated && <Signin />}
      {authenticated && <Dashboard />}
    </div>
  )
}
