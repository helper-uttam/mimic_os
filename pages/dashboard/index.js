import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/router";

import classes from "./index.module.css";

import Navbar from "../navbar/index";
import Footer from "../footer/index";
import NotAuthenticated from "../notauth";

const Dashboard = () => {
    const [authenticated, setAuth] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        let auth = localStorage.getItem("session");
        setAuth(auth);
        if(!auth){
            router.push("/signin")
        }
    }, [authenticated])
    return <div>
        <Navbar />
        {authenticated && <div className={classes.dashboard}>
            <div className={classes.title}>
                <h1>We have made <span className={classes.span}>3 simulators</span></h1>
            </div>
            <div className={classes.options}>
                <div className={classes.windows}>
                    <Image width="100%" height="100%" src="/assets/win.png" alt="win"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}>Windows Simulator</span></p>
                        <Link href="./windows"><button name="win" className={classes.btn} type="submit">Select</button></Link>
                    </div>
                </div>
                <div className={classes.linux}>
                    <Image width="100%" height="100%" src="/assets/linux.png" alt="linux"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}>Linux simulator</span></p>
                        <Link href="./linux"><button name="linux" className={classes.btn}  type="submit">Select</button></Link>
                    </div>
                </div>
                <div className={classes.mac}>
                    <Image width="100%" height="100%" src="/assets/mac.png" alt="mac"/>
                    <div className={classes.content}>
                        <p>Try our exclusive <span className={classes.span}> Mac Simulator </span></p>
                        <Link href="./mac"><button name="mac" className={classes.btn}  type="submit">Select</button></Link>
                    </div>
                </div>
            </div>
        </div>
        }
        { !authenticated &&
            <NotAuthenticated />
        }
        <Footer />
    </div>
}

export default Dashboard;