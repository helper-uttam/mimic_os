import React from "react";
import classes from "./index.module.css";

const UnsuccessfullAuthentication = () => {
    return <div className={classes.container}>
        <h1>Unsuccessful Authentication</h1>
        <h2>Please login or signup again.</h2>
    </div>
}
export default UnsuccessfullAuthentication;