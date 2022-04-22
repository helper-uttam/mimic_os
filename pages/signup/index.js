import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

//Componenets
import Navbar from "../navbar/index";
import Footer from "../footer/index";
//CSS
import classes from "./index.module.css";

const Login = () => {
    const [authenticated, setAuth] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios.post('http://localhost:3001/signup', user)
        .then(res => {
            setAuth(res.data);
            if(res.data === true){
                localStorage.setItem("session", "authenticated")
            }
        }).catch(err => {
            console.log(err);
        })
    }
    
    return <div>
        <Navbar />
        <div className={classes.container}>
            <div>
                <form className={classes.form}>
                    <input type="email" ref={emailRef} placeholder="Email" autoComplete="true"/>
                    <input type="password" ref={passwordRef} placeholder="Password" autoComplete="true"/>
                    <button className={classes.btn} type="submit" onClick={handleSubmit}>Create Account</button>
                    <Link href="/signin"><div className={classes.link}>Already have an account? sign in.</div></Link>
                </form>
            </div>
            <div className={classes.illustration}>
                <Image width={800} height={700} src="/assets/signin/illustration.png" />
            </div>
        </div>
        <Footer />
    </div>
}
export default Login;