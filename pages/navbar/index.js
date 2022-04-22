import Link from "next/link";
import React from "react";
import Image from 'next/image'
import classes from "./index.module.css";

const Navbar = () => {

    const handleLogout = () => {
        localStorage.clear();
    }

    return <div className={classes.nav_body}>
        <Link href="/">
            <div className={classes.left}>
                <Image width="225" height="60px" src="/assets/logo.png" alt="MimicOS"/>
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
            <button className={classes.button} type="submit" onClick={handleLogout}>LogOut</button>
        </div>
        </div>

    </div>
}

export default Navbar;