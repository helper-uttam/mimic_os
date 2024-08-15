import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//CSS
import classes from "./index.module.css";

//Componenets
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

    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: "dummy@"
        }
        
        valid.email && user.password.length > 5 &&
        
        localStorage.setItem("session", true);
        setAuth(true);
        router.push("/dashboard")
    
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
    }

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
    return <div>
        <Navbar />   
        {!authenticated && <div className={classes.container}>
            <div>
                <form className={classes.form}>
                    <input id="email" className={valid.email ? classes.valid : classes.invalid} type="text" ref={emailRef} placeholder="Your Email?" onChange={validateInputEmail} autoComplete="true"/>
                    {/* {!valid.email && <p style={{color: "red"}}>Please enter a valid address</p>}
                    <input id="password" className={valid.password ? classes.valid : classes.invalid} type="password" ref={passwordRef} placeholder="Password" onChange={validateInputPass} autoComplete="true"/>
                    {!valid.password && <p style={{color: "red"}}>Please enter a password longer than 5 characters.</p>} */}
                    <button className={classes.btn} type="submit" onClick={handleSubmit} >Take me In</button>
                    {/* <Link href="/signup"><div className={classes.link}>Create an account</div></Link> */}
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
            <Description />
        </div>
        <Footer />
    </div>
}
export default Signin;