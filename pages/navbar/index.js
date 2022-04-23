import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.css";

const Navbar = () => {
    const [authenticated, setAuth] = useState(false);
    const router = useRouter();

    useEffect(()=> {
        if(localStorage.getItem("session")){
            setAuth(true);
        }
    }, [authenticated]);
    
    const handleLogout = () => {
        setAuth(false);
        localStorage.clear();
        router.push("/signin");
    }

    return <div className={classes.nav_body}>
        <Link href="/">
            <div className={classes.left}>
                <Image width="225" height="60px" src="/assets/Logo.png" alt="MimicOS"/>
            </div>
        </Link>
        <div className={classes.right}>
            <div className={classes.about}>
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <div className={classes.about}>
                <Link href="/about">About</Link>
            </div>
            <div className={classes.about}>
                <Link href="/faqs">FAQs</Link>
            </div>
            <div>
             {authenticated && <button className={classes.button} type="submit" onClick={handleLogout}>LogOut</button>}
        </div>
        </div>

    </div>
}

export default Navbar;