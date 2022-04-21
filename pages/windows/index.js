import React from "react";
import classes from "./index.module.css";
import Link from "next/link";
import Image from 'next/image'

const Windows = () => {

    return <div className={classes.win}>
        <div className={classes.bg}>
            <Image layout="fill" src="/assets/windows/bg.jpeg" />
        </div>
            <div className={classes.icons}>
            <Link href="/windows/bin">
                <div className={classes.icon}>
                    <Image width={120} height={100} src="/assets/windows/bin.png" alt="recyclebin" />
                    <p className={classes.p}>Recycle Bin</p>
                </div>
            </Link>
            <Link href="/windows/chrome">
                <div className={classes.iconC}>
                    <Image width={150} height={100} src="/assets/windows/chrome.png" alt="chrome" />
                    <p className={classes.p}>Chrome</p>
                </div>
            </Link>
            <Link href="/windows/edge">
                <div className={classes.icon}>
                    <Image width={100} height={100} src="/assets/windows/edge.png" alt="edge" />
                    <p className={classes.p}>Edge</p>
                </div>
            </Link>
            <Link href="/windows/cli">
                <div className={classes.icon}>
                    <Image width={100} height={100} src="/assets/windows/cmd.webp" alt="cmd" />
                    <p className={classes.p}>Command Prompt</p>
                </div>
            </Link>
        </div>
    </div>
}

export default Windows;