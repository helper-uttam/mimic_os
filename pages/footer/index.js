import React from "react";
import Link from "next/link";
import classes from "./index.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <div className={classes.column}>
          <h3 className={classes.heading}>🚀 Made By</h3>
          <Link className={classes.link} href="https://quiet-gelato-8459ca.netlify.app/" target="_blank">› Uttam</Link>
          <Link className={classes.link} href="/">› Dev2</Link>
          <Link className={classes.link} href="/">› Dev3</Link>
        </div>
        <div className={classes.column}>
          <h3 className={classes.heading}>🛠️ Tech Stack</h3>
          <Link className={classes.link} href="https://nextjs.org/" target="_blank">› Next.js</Link>
          <Link className={classes.link} href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_modules" target="_blank">› CSS Modules</Link>
          <Link className={classes.link} href="https://reactjs.org/" target="_blank">› React</Link>
        </div>
        <div className={classes.column}>
          <h3 className={classes.heading}>📦 Tools</h3>
          <Link className={classes.link} href="https://axios-http.com/" target="_blank">› Axios</Link>
          <Link className={classes.link} href="https://mongodb.com/" target="_blank">› MongoDB</Link>
          <Link className={classes.link} href="https://vercel.com/" target="_blank">› Vercel</Link>
        </div>
      </div>

      <div className={classes.bottom}>
        <p>💖 We love Open Source</p>
        <p>
          Give a ⭐ on{" "}
          <Link href="https://github.com/helper-uttam/mimic_os" target="_blank">
            <span className={classes.github}>GitHub</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
