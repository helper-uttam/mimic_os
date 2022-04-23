import React from "react";
import Link from "next/link";

import classes from "./index.module.css";

const Footer = () => {
    return <div className={classes.container}>
        <div className={classes.first}>
            <div className={classes.first__1}>
                <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Made By</p>
                <div className={classes.link}><Link href="http://pubgofficial.me/portfolio/">&gt; Uttam</Link></div>
                <div className={classes.link}><Link href="/">&gt; Developer2</Link></div>
                <div className={classes.link}><Link href="/">&gt; Developer3</Link></div>
            </div>
            <div className={classes.first__2}>
                <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Tech-stacks Used</p>
                <div className={classes.link}><Link href="https://nextjs.org/">&gt; NextJS</Link></div>
                <div className={classes.link}><Link href="https://nodejs.org/en/">&gt; NodeJs</Link></div>
                <div className={classes.link}><Link href="https://www.javascriptstuff.com/what-are-css-modules/">&gt; CSS module</Link></div>
            </div>
            <div className={classes.first__3}>
            <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Extra&apos;s</p>
                <div className={classes.link}><Link  href="https://www.npmjs.com/package/axios">&gt; Axios</Link></div>
                <div className={classes.link}><Link href="https://mongodb.com/">&gt; MongoDB</Link></div>
                <div className={classes.link}><Link href="https://vercel.com/">&gt; Vercel</Link></div>
            </div>
        </div>
        <div className={classes.second}>
            We love Open Source &hearts; 
            &nbsp; &nbsp; &nbsp; &nbsp; 
            Do give a ⭐ on <Link href="https://github.com/helper-uttam/mimic_os"><span style={{color:'violet', cursor:'pointer'}}>GitHub</span></Link> if you loved this project.	
        </div>
    </div>
}
export default Footer;