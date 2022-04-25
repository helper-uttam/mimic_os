import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

//CSS
import classes from "./index.module.css";

//Componenets
import Navbar from "../navbar/index";
import Footer from "../footer/index";
import Dashboard from "../dashboard/index";
import Analytics from "../analytics/index"
import Description from "../description/index";

const Signin = () => {
    const [authenticated, setAuth] = useState(false);
    const [valid, setValid] = useState({
        email: true,
        password: true
    });

    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios.post(`${process.env.BASE_URL}signin`, {user})
        .then(res => {
            setAuth(res.data);
            if(res.data === true){
                localStorage.setItem("session", "authenticated");
                router.push("/dashboard")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const validateInputEmail = (e) => {
        let enterMail = e.target.value;
        if(enterMail.includes('@') && (enterMail.includes('.com') || enterMail.includes('.in') || enterMail.includes('.org'))){
            setValid({
                ...valid,
                email: true
            })
        }else{
            setValid({
                ...valid,
                email: false
            })
        } 
        if(valid.email && valid.password){
            const btn = document.getElementById('btn');
            console.log(btn);
            if(btn){
                btn.removeAttribute('disabled')
            }
        }
    }

    const validateInputPass = (e) => {
        let enterPass = e.target.value;
        if(enterPass.length > 5 && /[^a-zA-Z0-9\-\/]/.test( enterPass )){
            setValid({
                ...valid,
                password: true
            });
        }else{
            setValid({
                ...valid,
                password: false
            });
        }
        if(valid.email && valid.password){
            const btn = document.getElementById('btn');
            console.log(btn);
            if(btn){
                btn.removeAttribute('disabled')
            }
        }
    }
    return <div>
        <Navbar />   
        {!authenticated && <div className={classes.container}>
            <div>
                <form className={classes.form}>
                    <input id="email" className={valid.email ? classes.valid : classes.invalid} type="email" ref={emailRef} placeholder="Email" onChange={validateInputEmail} autoComplete="true"/>
                    {!valid.email && <p style={{color: "red"}}>Please enter a valid address</p>}
                    <input id="password" className={valid.password ? classes.valid : classes.invalid} type="password" ref={passwordRef} placeholder="Password" onChange={validateInputPass} autoComplete="true"/>
                    {!valid.password && <p style={{color: "red"}}>Please enter a password longer than 5 characters and must includes special characters.</p>}
                    <button id="btn" className={classes.btn} type="submit" onClick={handleSubmit} disabled>Take me In</button>
                    <Link href="/signup"><div className={classes.link}>Create an account</div></Link>
                </form>
            </div>
            <div className={classes.illustration}>
                <Image width={800} height={700} src="/assets/signin/illustration.png" />
            </div>
        </div>
        }
        { authenticated &&
            <Dashboard />
        }
        <div >
            <Analytics />
            <Description />
        </div>
        <Footer />
    </div>
}
export default Signin;