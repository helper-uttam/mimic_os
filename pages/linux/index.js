import React from "react";
import classes from "./index.module.css";
import Link from "next/link";
import Image from "next/image";

const Linux = () => {
    return <div className={classes.linux}>
    <div className={classes.bg}>
        <Image layout="fill" src="/assets/linux/linuxBG.jpg" />
    </div>
        <div className={classes.icons}>
        <Link href="/linux/terminal">
            <div className={classes.icon}>
                <Image width={120} height={100} src="/assets/linux/terminal.png" alt="terminal" />
                <p className={classes.p}>Terminal</p>
            </div>
        </Link>
    </div>
</div>
}

export default Linux;
