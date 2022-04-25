import React from "react";
import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.css";

const Linux = () => {
    return <div className={classes.linux}>
    <div className={classes.bg}>
        <Image layout="fill" src="/assets/mac/bg.jpg" />
    </div>
        <div className={classes.icons}>
        <Link href="/mac/terminal">
            <div className={classes.icon}>
                <Image width={120} height={100} src="/assets/mac/terminal.png" alt="terminal" />
                <p className={classes.p}>Terminal</p>
            </div>
        </Link>
    </div>
</div>
}

export default Linux;
