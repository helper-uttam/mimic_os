import React from "react";
import Image from "next/image";

import classes from "./index.module.css";

const Description = () => {
    return <div className={classes.container}>
        <div><Image width={200} height={200} src="/assets/windows/bg.jpeg" />Windows</div>
        <div><Image width={200} height={200} src="/assets/linux/linuxBG.jpg" />Linux</div>
        <div><Image width={200} height={200} src="/assets/mac/bg.jpg" />MacOS</div>
    </div>
}
export default Description;