import React from "react";
import Link from "next/link";
import Image from 'next/image'

import Navbar from "../navbar";
import classes from "./index.module.css";

const Dashboard = () => {

    return <div>
        <Navbar />
        <div className={classes.dashboard}>
            <div className={classes.title}>
                <h1>We have made <span className={classes.span}>3 simulators</span></h1>
            </div>
            <div className={classes.options}>
                <div className={classes.windows}>
                    <Image width="250px" height="100%" src="/assets/win.png" alt="win"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}>Windows Simulator</span></p>
                        <Link href="./windows"><button name="win" className={classes.btn} type="submit">Select</button></Link>
                    </div>
                </div>
                <div className={classes.linux}>
                    <Image width="205px" height="100%" src="/assets/linux.png" alt="linux"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}>Linux simulator</span></p>
                        <Link href="./linux"><button name="linux" className={classes.btn}  type="submit">Select</button></Link>
                    </div>
                </div>
                <div className={classes.mac}>
                    <Image width="300px" height="100%" src="/assets/mac.png" alt="mac"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}> Mac Simulator </span></p>
                        <Link href="./mac"><button name="mac" className={classes.btn}  type="submit">Select</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard;