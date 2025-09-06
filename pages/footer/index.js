import React from "react";
import Link from "next/link";

import classes from "./index.module.css";

const Footer = () => {
    return <div className={classes.container}>
        <div className={classes.first}>
            <div className={classes.first__1}>
                <p className={classes.heading}>Made By</p>
                <div className={classes.link}><Link href="http://pubgofficial.me/portfolio/">&gt; Uttam</Link></div>
                <div className={classes.link}><Link href="/">&gt; Dev2</Link></div>
                <div className={classes.link}><Link href="/">&gt; Dev3</Link></div>
            </div>
            <div className={classes.first__2}>
                <p className={classes.heading}>Tech-stacks Used</p>
                <div className={classes.link}><Link href="https://nextjs.org/">&gt; NextJS</Link></div>
                <div className={classes.link}><Link href="https://nextjs.org/docs/13/pages/building-your-application/styling/css-modules">&gt; CSS Modules</Link></div>
                <div className={classes.link}><Link href="https://www.javascriptstuff.com/what-are-css-modules/">&gt; CSS module</Link></div>
            </div>
            <div className={classes.first__3}>
            <p className={classes.heading}>Extra&apos;s</p>
                <div className={classes.link}><Link  href="https://www.npmjs.com/package/axios">&gt; Axios</Link></div>
                <div className={classes.link}><Link href="https://mongodb.com/">&gt; Mongo</Link></div>
                <div className={classes.link}><Link href="https://vercel.com/">&gt; Vercel</Link></div>
            </div>
        </div>
        <div className={classes.second}>
            <div>We love Open Source &hearts; </div>
            <div>Do give a ⭐ on <Link href="https://github.com/helper-uttam/mimic_os"><span style={{color:'violet', cursor:'pointer'}}>GitHub</span></Link> if you loved this project.	</div>
        </div>
    </div>
}
export default Footer;