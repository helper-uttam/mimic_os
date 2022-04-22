import React from "react";
import Link from "next/link";
import classes from "./index.module.css";

const Footer = () => {
    return <div className={classes.container}>
        <div className={classes.first}>
            <div className={classes.first__1}>
                <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Made By</p>
                <Link href="http://pubgofficial.me/portfolio/">&gt; Uttam</Link>
                <Link href="/">&gt; Developer2</Link>
                <Link href="/">&gt; Developer3</Link>
            </div>
            <div className={classes.first__2}>
            <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Tech-stacks Used</p>
                <Link href="https://nextjs.org/">&gt; NextJS</Link>
                <Link href="https://nodejs.org/en/">&gt; NodeJs</Link>
                <Link href="https://www.javascriptstuff.com/what-are-css-modules/">&gt; CSS module</Link>
            </div>
            <div className={classes.first__3}>
            <p style={{fontWeight:"bold", color:"white", fontSize:"20px"}}>Extra's</p>
                <Link  href="https://www.npmjs.com/package/axios">&gt; Axios</Link>
                <Link href="https://mongodb.com/">&gt; MongoDB</Link>
                <Link href="https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=next-website">&gt; Vercel</Link>
            </div>
        </div>
        <div className={classes.second}>
            We love Open Source &hearts;	
        </div>
    </div>
}
export default Footer;