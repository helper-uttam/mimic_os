import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

//Componenets
import Navbar from "../navbar/index";
import Footer from "../footer/index";
import Analytics from "../analytics/index"
import Description from "../description/index";

//CSS
import classes from "./index.module.css";
import Dashboard from "../dashboard";

const Login = () => {
    const [authenticated, setAuth] = useState(false);

    const [valid, setValid] = useState({
        email: true,
        password: true
    });
    const [passwordMatched, setPassMatched] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios.post(`${process.env.BASE_URL}signup`, {user})
        .then(res => {
            setAuth(res.data);
            if(res.data === true){
                localStorage.setItem("session", "authenticated")
                router.push("/dashboard");
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const validateInputEmail = (e) => {
        if(emailRef.current.value.includes('@') && (emailRef.current.value.includes('.com') || emailRef.current.value.includes('.in') || emailRef.current.value.includes('.org'))){
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
    }

    const validateInputPass = (e) => {
        if(e.target.value.length > 5){
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
       
    }
    const confirmPass = (e) => {
        if(passwordRef.current.value.localeCompare(e.target.value) === 0)
            setPassMatched(true);
        else
        setPassMatched(false);
    }
    return <div>
        <Navbar />
        { !authenticated &&
            <div className={classes.container}>
            <div>
                <form className={classes.form}>
                    <input id="email" className={valid.email ? classes.valid : classes.invalid} type="email" ref={emailRef} placeholder="Email" onChange={validateInputEmail} required autoComplete="true"/>
                    {!valid.email && <p style={{color: "red"}}>Please enter a valid address</p>}
                    <input id="password1" className={valid.password ? classes.valid : classes.invalid} type="password" ref={passwordRef} placeholder="New Password" onChange={validateInputPass} required autoComplete="true"/>
                    {!valid.password && <p style={{color: "red"}}>Please enter a password longer than 5 characters.</p>}
                    <input id="password2" className={valid.password ? classes.valid : classes.invalid} type="password" placeholder="Confirm Password" onChange={confirmPass} required autoComplete="true"/>
                    {!passwordMatched && <p style={{color: "red"}}>Entered password do not match with the previous entered password.</p>}
                    {valid.email && valid.password && passwordMatched && <button className={classes.btn} type="submit" onClick={handleSubmit} >Create My Account</button>}
                    {!(valid.email && valid.password && passwordMatched) && <button className={classes.btn} >Check your entered details</button>}
                    <Link href="/signin"><div className={classes.link}>Already have an account? sign in.</div></Link>
                </form>
            </div>
            <div className={classes.illustration}>
                <Image width={800} height={700} src="/assets/signin/illustration.png" />
            </div>
        </div>
        }
        {authenticated &&
            <Dashboard />
        }
        <div >
            <Analytics />
            <Description />
        </div>
        <Footer />
    </div>
}
export default Login;