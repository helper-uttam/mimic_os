import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import classes from "./index.module.css";

const Navbar = () => {
  const [authenticated, setAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("session")) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
    router.push("/auth/signin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={classes.nav_body}>
      <div className={classes.left}>
        <Link href="/">
          <Image width={180} height={50} src="/assets/Logo.png" alt="MimicOS" />
        </Link>
      </div>

      <div className={`${classes.right} ${menuOpen ? classes.showMenu : ""}`}>
        <Link href="/dashboard" className={classes.link}>Dashboard</Link>
        <Link href="/about" className={classes.link}>About</Link>
        <Link href="/faqs" className={classes.link}>FAQs</Link>
        {authenticated && (
          <button className={classes.button} onClick={handleLogout}>Logout</button>
        )}
      </div>

      <div className={classes.hamburger} onClick={toggleMenu}>
        <div className={classes.bar}></div>
        <div className={classes.bar}></div>
        <div className={classes.bar}></div>
      </div>
    </nav>
  );
};

export default Navbar;
