import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import classes from "./index.module.css";
import Navbar from "../navbar/index";
import Footer from "../footer/index";
import Dashboard from "../dashboard/index";
import Description from "../description/index";

const Signin = () => {
    const [authenticated, setAuth] = useState(false);
    const [valid, setValid] = useState({
        email: true,
        password: true
    });
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        if (!user.email || !user.password) {
            setError("Email and password are required.");
            return;
        }
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth`;
            const res = await axios.post(apiUrl, { ...user, type: "login" });
            
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setAuth(true);
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };
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
    };
    const validateInputPass = (e) => {
        let enterPass = e.target.value;
        if(enterPass.length > 5){
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
            if(btn){
                btn.removeAttribute('disabled')
            }
        }
    }
    return (
        <div>
            <Navbar />
            {!authenticated && (
                <div className={classes.container}>
                    <div>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <input id="email" className={valid.email ? classes.valid : classes.invalid} type="email" ref={emailRef} placeholder="Your Email?" onChange={validateInputEmail} autoComplete="username" required />
                            {!valid.email && <p style={{color: "red"}}>Please enter a valid address</p>}
                            <input id="password" className={valid.password ? classes.valid : classes.invalid} type="password" ref={passwordRef} placeholder="Password" onChange={validateInputPass} autoComplete="current-password" required />
                            {!valid.password && <p style={{color: "red"}}>Please enter a password longer than 5 characters.</p>}
                            {error && <p style={{color: "red"}}>{error}</p>}
                            <button className={classes.btn} type="submit" disabled={!(valid.email && valid.password)}>Take me In</button>
                            <button className={classes.btn} type="button" onClick={() => router.push("/signup")}>Create Account</button>
                        </form>
                    </div>
                    <div className={classes.illustration}>
                        <Image width={800} height={700} src="/assets/signin/illustration.png" alt="Sign in illustration" />
                    </div>
                </div>
            )}
            {authenticated && <Dashboard />}
            <div>
                <Description />
            </div>
            <Footer />
        </div>
    );
};
export default Signin;