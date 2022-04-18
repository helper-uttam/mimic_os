import Link from "next/link";
import React from "react";
import classes from "./index.module.css";

const Navbar = () => {
    return <div className={classes.nav_body}>
        <div className={classes.left}>
            <div className={classes.title}>MimicOS</div>
        </div>
        <div className={classes.middle}>
            <div className={classes.about}>
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <div className={classes.about}>
                <Link href="/about">About</Link>
            </div>
            <div className={classes.about}>
            <Link href="/faqs">FAQ's</Link>
            </div>
        </div>
        <div className={classes.right}>
            <button type="submit">LogOut</button>
        </div>
        
    </div>
}

export default Navbar;