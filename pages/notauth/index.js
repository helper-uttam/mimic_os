import React from "react";

import classes from "./index.module.css";

const NotAuthenticated = () => {
    return <div className={classes.container}>
        <h1>You are not authroized to view this web page!</h1>
        <h2>Login/Signup again</h2>
    </div>
}
export default NotAuthenticated;