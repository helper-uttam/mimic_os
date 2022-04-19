import React from "react";
import classes from "./index.module.css";
import Link from "next/link";

const Windows = () => {

    return <div className={classes.win}>
        <div className={classes.bg}>
            <img src="/assets/bg.jpeg" />
        </div>
        <div className={classes.icons}>
            <div className={classes.icon}>
                <img src="/assets/recyclebinicon.png" alt="recyclebin" />
                <p className={classes.p}>Recycle Bin</p>
            </div>
            <div className={classes.iconC}>
                <img src="/assets/chromeicon.png" alt="chrome" />
                <p className={classes.p}>Chrome</p>
            </div>
            <div className={classes.icon}>
                <img src="/assets/edgeicon.png" alt="edge" />
                <p className={classes.p}>Edge</p>
            </div>
            <Link href="/windows/cli">
                <div className={classes.icon}>
                    <img src="/assets/cmd.webp" alt="cmd" />
                    <p className={classes.p}>Command Prompt</p>
                </div>
            </Link>
        </div>
    </div>
}

export default Windows;